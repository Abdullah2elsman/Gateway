<?php

namespace App\Trainees\Waitlist\Add;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class AddPreferableTime
{
    use SendNotification;

    protected $current_user;

    public function __construct(?Trainee $trainee)
    {
        // Only authorize if trainee is provided, otherwise allow for general time slot management
        if ($trainee) {
            Gate::authorize('viewTrainers', $trainee);
        }

        $this->current_user = Auth::user();
    }

    public function addPreferableTime(?GeneralMeta $preferable_time, Request $request)
    {
        try {
            // Validate required fields
            if (!$request->filled('preferable_time')) {
                return response(['message' => 'Preferable time is required.'], 400);
            }

            if (!$request->filled('attend_type')) {
                return response(['message' => 'Attend type is required.'], 400);
            }

            // Validate attend_type value
            $attend_type = $request->attend_type;
            if (!in_array($attend_type, ['Online', 'Offline', 'Hybrid', 'Private'])) {
                return response(['message' => 'Attend type must be one of: Online, Offline, Hybrid, Private.'], 400);
            }

            // Determine meta_key based on attend_type
            $meta_key_mapping = [
                'Online' => 'time_slots_online',
                'Offline' => 'time_slots_offline',
                'Hybrid' => 'time_slots_hybrid',
                'Private' => 'time_slots_private'
            ];
            $meta_key = $meta_key_mapping[$attend_type];

            // Trim and normalize the preferable time value
            $preferable_time_value = trim($request->preferable_time);

            // Prevent adding attend type values as time slots
            $forbidden_values = ['adult', 'teen', 'online', 'offline', 'hybrid', 'private'];
            if (in_array(strtolower($preferable_time_value), $forbidden_values)) {
                return response(['message' => 'Invalid preferable time value. Please enter a valid time slot (e.g., "Morning 9-11 AM").'], 400);
            }

            // Check if preferable time already exists for this attend type (case-insensitive)
            $is_exists = $preferable_time->where('meta_key', $meta_key)
                ->whereRaw('LOWER(meta_value) = ?', [strtolower($preferable_time_value)])
                ->exists();

            if ($is_exists) {
                return response(['message' => "This preferable time already exists for {$attend_type} attend type."], 400);
            }

            // Create the new preferable time with appropriate meta_key
            $preferable_time->create([
                'meta_key' => $meta_key,
                'meta_value' => $preferable_time_value,
            ]);

            $this->notifyUser("has added a new preferable time ({$attend_type}) to the wait list", $this->current_user, 'create_trainees_in_waitlist');

            return response(['message' => "Preferable time added successfully for {$attend_type} attend type"], 200);
        } catch (Exception $e) {
            return response(['message' => "Something went wrong. Preferable time cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}

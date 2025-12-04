<?php

namespace App\Trainees\Waitlist\Add;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AddPreferableTime
{
    use SendNotification;

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainers', $trainee);

        // Use a single shared list for all preferable times
        $this->list_name = 'preferable_times';

        $this->current_user = auth()->user();
    }

    public function addPreferableTime(?GeneralMeta $preferable_time, Request $request)
    {
        try
        {
            // Validate required field
            if (!$request->filled('preferable_time')) 
            {
                return response(['message' => 'Preferable time is required.'], 400);
            }

            // Trim and normalize the preferable time value
            $preferable_time_value = trim($request->preferable_time);

            // Prevent adding age group values as time slots
            $forbidden_values = ['adult', 'teen', 'online', 'offline', 'hybrid', 'private'];
            if (in_array(strtolower($preferable_time_value), $forbidden_values)) 
            {
                return response(['message' => 'Invalid preferable time value. Please enter a valid time slot (e.g., "Morning 9-11 AM").'], 400);
            }

            // Check if preferable time already exists (case-insensitive) in the shared list
            $is_exists = $preferable_time->where('meta_key', $this->list_name)
                                        ->whereRaw('LOWER(meta_value) = ?', [strtolower($preferable_time_value)])
                                        ->exists();
            
            if ($is_exists) 
            {
                return response(['message' => 'This preferable time already exists.'], 400);
            }
            
            // Create the new preferable time in the shared list
            $preferable_time->create([
                'meta_key' => $this->list_name, 
                'meta_value' => $preferable_time_value,
            ]);

            $this->notifyUser('has added a new preferable time to the wait list', $this->current_user, 'create_trainees_in_waitlist');

            return response(['message' => 'Preferable time added successfully'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Preferable time cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
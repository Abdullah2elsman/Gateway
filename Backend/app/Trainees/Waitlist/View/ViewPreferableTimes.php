<?php

namespace App\Trainees\Waitlist\View;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ViewPreferableTimes
{
    public function __construct(?Trainee $trainee)
    {
        // Only authorize if trainee is provided, otherwise allow for general time slot viewing
        if ($trainee) {
            Gate::authorize('viewTrainers', $trainee);
        }
    }

    public function viewPreferableTimes(?GeneralMeta $preferable_time, Request $request)
    {
        try {
            // Determine meta_key based on attend_type parameter
            if (!$request->filled('attend_type')) {
                // If no attend_type specified, return empty to enforce separation
                return response([], 200);
            }

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

            // Fetch preferable times for the specific attend type
            $preferable_times = $preferable_time->where('meta_key', $meta_key)->get();

            $preferable_times_collection = [];

            foreach ($preferable_times as $key => $g_preferable_time) {
                $preferable_times_collection[$key] = [
                    'id' => $g_preferable_time->id,
                    'preferable_time' => $g_preferable_time->meta_value,
                    'attend_type' => $attend_type
                ];
            }

            return response($preferable_times_collection, 200);
        } catch (Exception $e) {
            return response(['message' => "Something went wrong. Preferable times cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}

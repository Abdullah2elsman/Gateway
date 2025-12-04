<?php

namespace App\Trainees\Waitlist\Add;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AddLevel
{
    use SendNotification;

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainers', $trainee);
        
        $this->list_name = 'waitlist_levels';

        $this->current_user = auth()->user();
    }

    public function addLevel(?GeneralMeta $level, Request $request)
    {
        try
        {
            // Validate required field
            if (!$request->filled('level')) 
            {
                return response(['message' => 'Level is required.'], 400);
            }

            // Trim and normalize the level value
            $level_value = trim($request->level);

            // Check if level already exists (case-insensitive)
            $is_exists = $level->where('meta_key', $this->list_name)
                              ->whereRaw('LOWER(meta_value) = ?', [strtolower($level_value)])
                              ->exists();
            
            if ($is_exists) 
            {
                return response(['message' => 'Level already exists'], 400);
            }
            
            $level->create([
                'meta_key' => $this->list_name,
                'meta_value' => $level_value,
            ]);

            $this->notifyUser('has added a new level to the wait list', $this->current_user, 'create_trainees_in_waitlist');

            return response(['message' => 'Level added successfully'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Level cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
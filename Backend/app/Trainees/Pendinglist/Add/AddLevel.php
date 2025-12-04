<?php

namespace App\Trainees\Pendinglist\Add;

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
        Gate::authorize('addPendingLevel', $trainee);

        $this->list_name = 'pendinglist_levels';

        $this->current_user = auth()->user();
    }

    public function addLevel(?GeneralMeta $level, Request $request)
    {
        try
        {
            $is_exists = $level->where('meta_key', $this->list_name)->where('meta_value', $request->level)->exists();
            
            if ($is_exists) 
            {
                return response(['message' => 'Level already exists'], 400);
            }
            
            $level->create([
                'meta_key' => $this->list_name,
                'meta_value' => $request->level
            ]);

            $this->notifyUser('has added a new level to the pending list', $this->current_user, 'create_trainees_in_pendinglist');

            return response(['message' => 'Level added successfully'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Level cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
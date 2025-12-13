<?php

namespace App\Trainees\Pendinglist\Assign;

use Exception;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AssignLevel
{
    use GetList, SendNotification;

    public function __construct(?Trainee $trainee, $trainee_id)
    {
        Gate::authorize('assignLevel', $trainee->find($trainee_id));

        $this->list_name = 'pendinglist_levels';

        $this->list = 'Wait List';

        $this->current_user = auth()->user();
    }

    public function assign(?Trainee $trainee, ?GeneralMeta $level, Request $request, $trainee_id)
    {
        try {
            // Handle level removal (when level is null)
            if ($request->level === null) {
                $trainee->where('id', $trainee_id)->update([
                    'level' => null,
                ]);

                $this->notifyUser('has removed a level from a trainee on the pending list', $this->current_user, 'assign_level');

                return response(['message' => 'Level removed successfully'], 200);
            }

            $is_exists = $level->where('meta_key', $this->list_name)->where('id', $request->level)->exists();

            $is_trainer_set = $trainee->where('id', $trainee_id)->first()->trainer_id;

            !$is_exists && $message = 'Level is not exists in the pending list.';

            !$is_trainer_set && $message = 'Trainer not set for this trainee.';

            if (!$is_exists || !$is_trainer_set) {
                return response(['message' => $message], 400);
            }

            $trainee->where('id', $trainee_id)->update([
                'level' => $request->level,
                'current_list' => $this->List($this->list)->id,
            ]);

            $this->notifyUser('has assigned a level to a trainee on the pending list', $this->current_user, 'assign_level');

            return response(['message' => 'Level assigned successfully'], 200);
        } catch (Exception $e) {
            return response(['message' => "Something went wrong. Level cannot be assigned. Please contact the administrator of the website."], 400);
        }
    }
}

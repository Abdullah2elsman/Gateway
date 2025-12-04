<?php

namespace App\Trainees\Pendinglist\Assign;

use Exception;
use App\Models\User;
use App\Models\Trainee;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AssignTrainer
{
    use SendNotification; 

    public function __construct(?Trainee $trainee, $trainee_id)
    {
        Gate::authorize('assignTrainer', $trainee->find($trainee_id));

        $this->current_user = auth()->user();
    }

    public function assign(?Trainee $trainee, ?User $trainer, Request $request, $trainee_id)
    {
        try
        {
            $is_exists = $trainer->where('id', $request->trainer)->exists();

            if (!$is_exists)
            {
                return response(['message' => 'Trainer is not exists in the system.'], 400);
            }

            $trainee->where('id', $trainee_id)->update([
                'trainer_id' => $request->trainer
            ]);

            $this->notifyUser('has assigned a trainer to a trainee on the pending list', $this->current_user, 'assign_trainer');
            
            return response(['message' => 'Trainer assigned successfully'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Trainer cannot be assigned. Please contact the administrator of the website."], 400);
        }
    }
}
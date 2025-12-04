<?php

namespace App\Trainees\Pendinglist\Deletes;

use Exception;
use App\Models\Trainee;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete extends Permissions
{
    use SendNotification;

    public function __construct(?Trainee $Trainee, $id)
    {
        Gate::authorize('deletePendingTrainee', $Trainee->find($id));

        $this->current_user = auth()->user();
    }

    public function delete(?Trainee $trainee, $id)
    {
        try
        {
            $current_trainee = $trainee->find($id);

            $current_trainee->delete();

            $this->notifyUser('has deleted a trainee from the pending list', $this->current_user, 'delete_trainees_from_pendinglist');

            return response(['message' => "Trainee deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Trainee cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
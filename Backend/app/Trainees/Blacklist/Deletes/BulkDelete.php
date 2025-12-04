<?php

namespace App\Trainees\Blacklist\Deletes;

use Exception;
use App\Models\Trainee;
use App\Traits\BulkHelper;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;


class BulkDelete extends Permissions
{
    use BulkHelper, SendNotification;

    public function __construct()
    {
        $this->permission = 'deleteBlackTrainee';

        $this->current_user = auth()->user();
    }

    public function delete(?Trainee $trainee, Request $request)
    {
        $this->Authorized($trainee, $request->trainees, $this);

        try 
        {
            foreach($request->trainees as $trainee_id)
            {
                $current_trainee = $trainee->find($trainee_id);
    
                $current_trainee->delete();
            }

            $this->notifyUser('has deleted trainees from the blacklist', $this->current_user, 'delete_trainees_from_blacklist');

            return response(['message' => "Trainees deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainees cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
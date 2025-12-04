<?php

namespace App\Users\Deletes;

use Exception;
use App\Models\User;
use App\Traits\BulkHelper;
use App\Traits\SendNotification;
use App\Http\Requests\BulkRequest;

class BulkDelete
{
    use BulkHelper, SendNotification;

    public function __construct()
    {
        $this->permission = 'deleteUser';

        $this->current_user = auth()->user();
    }

    public function delete(?User $user, BulkRequest $request)
    {
        $this->Authorized($user, $request->users, $this);

        try
        {
            foreach($request->users as $user_id)
            {
                $current_user = $user->find($user_id);
    
                $current_user->delete();
            }

            $this->notifyUser('has deleted users', $this->current_user, 'delete_users');

            return response(['message' => "Users deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The users cannot be deleted. The selected user is involved in a number of data entries in the system."], 400);
        }
    }
}
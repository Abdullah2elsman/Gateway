<?php

namespace App\Users\PendingUsers;

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
        $this->permission = 'deletePendingUser';

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

            $this->notifyUser('has deleted users from pending users', $this->current_user, 'delete_pending_users');

            return response(['message' => "Users deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The users cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Users\PendingUsers;

use Exception;
use App\Models\User;
use App\Traits\BulkHelper;
use App\Traits\SendNotification;
use App\Http\Requests\BulkRequest;

class BulkActivate
{
    use BulkHelper, SendNotification;

    public function __construct()
    {
        $this->permission = 'activatePendingUser';

        $this->current_user = auth()->user();
    }

    public function activate(?User $user, BulkRequest $request)
    {
        $this->Authorized($user, $request->users, $this);

        try
        {
            foreach($request->users as $user_id)
            {
                $current_user = $user->find($user_id);
                
                $current_user->update([
                    'is_activated' => true
                ]);
            }
            
            $this->notifyUser('has activated users on the pending users', $this->current_user, 'activate_pending_users');

            return response(['message' => "User activated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be activated. Please contact the administrator of the website."], 400);
        }
    }
}
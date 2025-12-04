<?php

namespace App\Users\PendingUsers;

use Exception;
use App\Models\User;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Activate
{
    use SendNotification;

    public function __construct(?User $user, $id)
    {
        Gate::authorize('activatePendingUser', $user->find($id));

        $this->current_user = auth()->user();
    }

    public function activate(?User $user, $id)
    {
        try
        {
            $current_user = $user->find($id);
                
            $current_user->update([
                'is_activated' => true
            ]);

            $this->notifyUser('has activated a user on the pending users', $this->current_user, 'activate_pending_users');

            return response(['message' => "User activated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be activated. Please contact the administrator of the website."], 400);
        }
    }
}
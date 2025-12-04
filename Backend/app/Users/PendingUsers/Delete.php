<?php

namespace App\Users\PendingUsers;

use Exception;
use App\Models\User;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete
{
    use SendNotification;

    public function __construct(?User $user, $id)
    {
        Gate::authorize('deletePendingUser', $user->find($id));

        $this->current_user = auth()->user();
    }

    public function delete(?User $user, $id)
    {
        try
        {
            $current_user = $user->find($id);
                
            $current_user->delete();

            $this->notifyUser('has deleted a user from pending users', $this->current_user, 'delete_pending_users');

            return response(['message' => "User deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
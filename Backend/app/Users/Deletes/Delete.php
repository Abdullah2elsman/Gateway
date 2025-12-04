<?php

namespace App\Users\Deletes;

use Exception;
use App\Models\User;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete
{
    use SendNotification; 

    public function __construct(?User $user, $id)
    {
        Gate::authorize('deleteUser', User::find($id));

        $this->current_user = auth()->user();
    }

    public function delete(?User $user, $id)
    {
        try
        {
            $current_user = $user->find($id);
                
            $current_user->delete();

            $this->notifyUser('has deleted a user', $this->current_user, 'delete_users');

            return response(['message' => "User deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be deleted. The selected user is involved in a number of data entries in the system."], 400);
        }
    }
}
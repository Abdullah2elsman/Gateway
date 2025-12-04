<?php

namespace App\Roles\Deletes;

use Exception;
use App\Models\Role;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete
{
    use SendNotification;

    public function __construct(?Role $role)
    {
        Gate::authorize('deleteRole', $role);

        $this->current_user = auth()->user();
    }

    public function delete(?Role $role, $id)
    {
        try
        {
            $current_role = $role->find($id);

            $current_role->delete();

            $this->notifyUser('has deleted a role', $this->current_user, 'delete_role');

            return response(['message' => "Role deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Role cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
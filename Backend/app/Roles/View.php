<?php

namespace App\Roles;

use App\Models\Role;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;
use Exception;

class View extends Permissions
{
    public function __construct(?Role $role)
    {
        Gate::authorize('viewRole', $role);
    }

    public function view(?Role $role)
    {
        try
        {
            foreach($role->get() as $key => $current_role)
            {
                $roles[$key] = ['id' => $current_role->id, 'role_title' => $current_role->role, 'created_at' => $current_role->created_at, 'updated_at' => $current_role->updated_at];
            }

            return response(['roles' => $roles], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The roles cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
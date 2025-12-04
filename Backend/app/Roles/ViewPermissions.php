<?php

namespace App\Roles;

use App\Models\Role;
use App\Models\Permission;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;
use Exception;

class ViewPermissions extends Permissions
{
    public function __construct(?Role $role)
    {
        Gate::authorize('viewPermissions', $role);
    }

    public function view(?Role $role, $id)
    {
        try
        {
            $current_role = $role->find($id);

            $permission_collection = [];

            foreach($current_role->permissions as $current_permission)
            {
                $permission_collection[$current_permission->per_collection][$current_permission->per_key] = boolval($current_permission->per_value);
            }

            $roles_collection = ['id' => $current_role->id, 'role_title' => $current_role->role, ...$permission_collection];


            return response(['roles' => $roles_collection], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The role cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}

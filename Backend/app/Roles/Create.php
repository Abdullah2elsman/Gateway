<?php

namespace App\Roles;

use Exception;
use App\Models\Role;
use App\Models\Permission;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\Gate;


class Create extends Permissions
{
    use SendNotification;

    public function __construct(?Role $role)
    {
        Gate::authorize('createRole', $role);

        $this->current_user = auth()->user();
    }

    public function create(?Role $role, ?Permission $permission, RoleRequest $request)
    {
        try
        {
            $created_role = $role->create(['role' => $request->role_title]);

            foreach($this->permission as $collection_key => $collection)
            {
                foreach($collection as $permission_key => $permission_value)
                {
                    $per_key = is_string($permission_key) ? $permission_key : $permission_value;

                    is_bool($request->permissions[$collection_key][$per_key]) && $permission->create(['role_id' => $created_role->id, 'per_collection' => $collection_key, 'per_key' => $per_key, 'per_value' => $request->permissions[$collection_key][$per_key]]);
                }
            }

            $this->notifyUser('has created a role', $this->current_user, 'create_role');

            return response(['message' => "Role created successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The role cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}
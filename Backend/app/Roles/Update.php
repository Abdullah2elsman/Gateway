<?php

namespace App\Roles;

use Exception;
use App\Models\Role;
use App\Models\Permission;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\Gate;

class Update extends Permissions
{
    use SendNotification;

    public function __construct(?Role $role)
    {
        Gate::authorize('updateRole', $role);

        $this->current_user = auth()->user();
    }

    public function update(?Role $role, ?Permission $permission, RoleRequest $request, $id)
    {
        try
        {
            $intended_role = $role->where('id', $id)->first();

            $request->filled('role_title') &&  $intended_role->update(['role' => $request->role_title]);

            foreach($this->permission as $collection_key => $collection)
            {
                foreach($collection as $permission_key => $permission_value)
                {
                    $per_key = is_string($permission_key) ? $permission_key : $permission_value;

                    is_bool($request->permissions[$collection_key][$per_key]) && $permission->where('role_id', $intended_role->id)->where('per_collection', $collection_key)->where('per_key', $per_key)->update(['per_value' => boolval($request->permissions[$collection_key][$per_key])]);
                }
            }

            $this->notifyUser('has updated a role', $this->current_user, 'update_role');

            return response(['message' => "Role updated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The role cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
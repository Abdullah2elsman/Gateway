<?php

namespace App\Roles\Deletes;

use Exception;
use App\Models\Role;
use App\Traits\BulkHelper;
use App\Traits\SendNotification;
use App\Http\Requests\BulkRoleRequest;

class BulkDelete
{
    use BulkHelper, SendNotification;

    public function __construct()
    {
        $this->permission = 'deleteRole';

        $this->current_user = auth()->user();
    }

    public function delete(?Role $role, BulkRoleRequest $request)
    {
        $this->Authorized($role, $request->roles, $this);

        try
        {
            foreach($request->roles as $role_id)
            {
                $current_role = $role->find($role_id);

                $current_role->delete();
            }

            $this->notifyUser('has deleted roles', $this->current_user, 'delete_role');

            return response(['message' => "Roles deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The roles cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
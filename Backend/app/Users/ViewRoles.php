<?php

namespace App\Users;

use App\Models\Role;
use App\Permissions\Permissions;

class ViewRoles extends Permissions
{
    public function __construct($current_user)
    {
        $this->current_user = $current_user;
        
        $this->permissions = ['view_roles', 'view_self_role'];

        $this->permission_collection = 'users';
    }

    public function view(?Role $role)
    {
        try
        {
            $roles = [];

            $self_role = [];

            $collection = [];

            $index = 0;
            
            foreach ($this->permissions as $permission)
            {
                foreach($role->get() as $key => $u_role)
                {
                    if($this->isAllowed($this->current_user, $permission, $this->permission_collection, $this->current_user->id))
                    {
                        $permission === 'view_roles' && $roles[$key] = $u_role->role;
                        
                        count($roles) === 0 && $self_role[$index] = $u_role->role;
                    }
                }
            }

            $collection = [...$self_role, ...$roles];

            return response(["roles" => $collection], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The roles cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
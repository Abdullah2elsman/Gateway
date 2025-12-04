<?php

namespace App\Traits;

trait CheckPermissionByBranch
{
    protected function CheckPermissionByBranch($class, $permission_collection, $current_permission, $permission_keys)
    {
        $allowed = [];

        $allowed_by_branch = false;

        foreach($permission_keys as $permission_key)
        {
            foreach((object) $class->current_user?->role->permissions as $permission)
            {
                if($permission->per_collection === $permission_collection)
                {
                    $permission->per_key === $permission_key && array_push($allowed, boolval($permission->per_value));

                    $permission->per_key === $current_permission && $allowed_by_branch = boolval($permission->per_value);
                }
            }
        }

        foreach($allowed as $permission)
        {
            $permission === true && $allowed_by_branch = false;
        }

        return $allowed_by_branch;
    }
}
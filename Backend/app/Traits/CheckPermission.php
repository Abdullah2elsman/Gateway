<?php

namespace App\Traits;

trait CheckPermission
{
    protected function CheckPermission($user, $permission_keys, $permission_collection, $user_id = null)
    {
        $allowed = false;

        foreach($permission_keys as $permission_key)
        {
            foreach((object) $user?->role->permissions as $permission)
            {
                if($permission->per_collection === $permission_collection && boolval($permission->per_value))
                {
                    ($permission->per_key === $permission_key && $user->role_id === $permission->role_id) && (str_contains($permission->per_key, 'own') || str_contains($permission->per_key, 'self')? $user->id === $user_id && $allowed = boolval($permission->per_value) : $allowed = boolval($permission->per_value));
                }
            }
        }

        return $allowed;
    }
}
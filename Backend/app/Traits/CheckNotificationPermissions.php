<?php

namespace App\Traits;

trait CheckNotificationPermissions
{
    protected function CheckNotificationPermission($user, $permission_key)
    {
            foreach((object) $user?->role->permissions as $permission)
            {
                if($permission->per_collection === 'notification' && $permission->per_key === $permission_key)
                {
                    return boolval($permission->per_value);
                }
            }

        return false;
    }
}
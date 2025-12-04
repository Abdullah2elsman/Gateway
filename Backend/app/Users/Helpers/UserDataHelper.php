<?php

namespace App\Users\Helpers;

trait UserDataHelper
{
    protected function UserDataHelper($user, $request, $action, $class)
    {
        foreach($class->permission['users'] as $permission_key => $permission_value)
        {
             //Chcek if permission allowed to perform manual assignments by the user otherwise default assignments stored in database
            if($class->isUnique($permission_key, $action) && $class->isAllowed($class->current_user, $permission_key, $class->permission_collection))
            {
                $permission_value === 'role_id'?  $request->has('role') && $user->$permission_value = $class->Role($request->role)->id : $request->has('is_activated') && $user->$permission_value = $request->$permission_value;
            }

        }
    }
}
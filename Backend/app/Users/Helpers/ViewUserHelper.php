<?php

namespace App\Users\Helpers;


trait ViewUserHelper
{ 
    protected function viewUser($class)
    {
        $user_data = [];

        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_self') && $user_data =  $class->getCollection($class);

        $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) && $user_data =  $class->getCollection($class);

        $message = count($user_data) === 0 ? response(['message' => 'Unauthorized'], 401) : response(['user' => $user_data], 201);

        return $message;
    }
}
<?php

namespace App\Users\Helpers;


trait ViewUsersHelper
{
    protected function viewUsers($users, $request, $class)
    {
        $users_data = [];

        foreach ($class->permission_keys as $permission_key) {
            $class->CheckPermissionStatus($class->current_user, $class->permission_collection, $permission_key) && $users_data =  $request->filled('branch') ? $class->getCollection($users->where('branch_id', $this->Branch($request->branch)->id)->where('is_activated', $class->status)->orderBy('created_at', 'desc')->get(), $class) : $class->getCollection($users->where('is_activated', $class->status)->orderBy('created_at', 'desc')->get(), $class);

            (str_contains($permission_key, 'view_own') && $class->CheckPermissionStatus($class->current_user, $class->permission_collection, $permission_key) && count($users_data) === 0) &&

                $users_data = $request->filled('branch') ? $class->getCollection($users->where('user_id', $class->current_user->id)->where('branch_id', $this->Branch($request->branch)->id)->where('is_activated', $class->status)->orderBy('created_at', 'desc')->get(), $class) : $class->getCollection($users->where('user_id', $class->current_user->id)->where('is_activated', $class->status)->orderBy('created_at', 'desc')->get(), $class);
        }

        $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) && $users_data = $class->getCollection($users->where('branch_id', $class->current_user->branch_id)->where('is_activated', $class->status)->orderBy('created_at', 'desc')->get(), $class);

        $message = count($users_data) === 0 ? response(['message' => 'Unauthorized'], 401) : response(['users' => $users_data], 201);

        (count($users_data) > 0 && $users_data[0] === 'empty') && $message = response(['message' => 'List is empty.'], 201);

        return $message;
    }
}

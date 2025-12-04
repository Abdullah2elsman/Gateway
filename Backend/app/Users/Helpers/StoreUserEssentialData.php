<?php

namespace App\Users\Helpers;
use Illuminate\Support\Facades\Hash;

trait StoreUserEssentialData
{
    protected function StoreUserEssentialData($user, $request, $action, $class)
    {
        $user->user_id = $class->current_user->id;

        $user->branch_id = $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) ? $class->current_user->branch_id : $class->Branch($request->branch)->id;

        $user->role_id = $class->Role(env('USER_DEFAULT_ROLE'))->id;

        $user->full_name = $request->full_name;

        $user->email = $request->email;

        $user->password = Hash::make($request->password);

        $user->is_activated = env('GUEST_DEFAULT_STATUS');

        $class->UserDataHelper($user, $request, $action, $class);

        $user->save();

        return $user;
    }
}
<?php

namespace App\Users\Helpers;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

trait UpdateUserEssentialData
{
    protected function UpdateUserEssentialData($user, Request $request, $class)
    {
        $request->has('branch') && $user->branch_id = $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) ? $class->current_user->branch_id : $class->Branch($request->branch)->id;

        $request->has('full_name') && $user->full_name = $request->full_name;

        $request->has('email') && $user->email = $request->email;

        $request->has('password') && $user->password = Hash::make($request->password);
        
        foreach($class->permissions as $action)
        {
            $class->UserDataHelper($user, $request, $action, $class);
        }

        $user->save();

        return $user;
    }
}
<?php

namespace App\Users\Helpers;
use Illuminate\Support\Facades\Hash;

trait StoreUserEssentialData
{
    protected function StoreUserEssentialData($user, $request, $action, $class){
        $user->user_id = 2425;

        $user->branch_id = 2424;

        $user->role_id = 2423;

        $user->full_name = $request->full_name;

        $user->email = $request->email;

        $user->password = Hash::make($request->password);

        $user->is_activated = 1;

        $class->UserDataHelper($user, $request, $action, $class);

        $user->save();

    }
}
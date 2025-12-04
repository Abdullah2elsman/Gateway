<?php

namespace App\Traits;

use Illuminate\Support\Facades\Gate;

trait BulkHelper
{
    protected function Authorized($user, $users, $class)
    {
        foreach($users as $user_id)
        {
            Gate::authorize($class->permission, $user->find($user_id));
        }
    }
}
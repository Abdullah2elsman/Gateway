<?php

namespace App\Traits;

use App\Models\Role;

trait GetRole
{
    protected function Role($role)
    {
        return Role::where('role', $role)->first();
    }
}
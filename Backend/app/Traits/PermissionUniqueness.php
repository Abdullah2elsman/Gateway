<?php

namespace App\Traits;

trait PermissionUniqueness
{
    protected function isUnique($permission_key, $permission_value)
    {
        return is_string($permission_key) && str_contains($permission_key, $permission_value);
    }
}
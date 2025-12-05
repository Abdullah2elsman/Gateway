<?php

namespace App\Traits;

use App\Models\User;

trait GetUser
{
    /**
     * Get user by ID
     */
    protected function User($id)
    {
        if (!$id) {
            return null;
        }

        return User::select('id', 'full_name', 'email')
            ->where('id', $id)
            ->first();
    }
}

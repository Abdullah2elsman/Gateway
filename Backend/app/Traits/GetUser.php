<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

trait GetUser
{
    /**
     * Get user by ID with caching
     */
    protected function User($id)
    {
        if (!$id) {
            return null;
        }

        $cacheKey = "user_{$id}";
        
        return Cache::remember($cacheKey, 1800, function () use ($id) {
            return User::select('id', 'full_name', 'email')
                ->where('id', $id)
                ->first();
        });
    }
}
<?php

namespace App\Users\Auth;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;

class Logout
{
    public function logout(User $user)
    {
        try {
            auth()->user()->tokens()->delete();

            return response(['message' => 'Logged out successfully.'], 200);
        } catch (Exception $e) {
            return response(['message' => 'Something went wrong.'], 401);
        }
    }
}

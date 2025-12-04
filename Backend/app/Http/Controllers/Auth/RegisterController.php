<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Users\Self\Create;
use App\Models\User;
use App\Models\UserMeta;

class RegisterController extends Controller
{
    private $register;

    public function __construct()
    {
        $this->register = new Create();
    }

    public function register(?User $user, UserMeta $UserMeta, RegisterRequest $request)
    {
        return $this->register->create($user, $UserMeta, $request);
    }
}

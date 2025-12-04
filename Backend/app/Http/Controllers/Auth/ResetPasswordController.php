<?php

namespace App\Http\Controllers\Auth;

use App\Users\Auth\Reset;
use App\Users\Auth\Forget;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ResetPasswordRequest;
use App\Http\Requests\Users\ForgetPasswordRequest;


class ResetPasswordController extends Controller
{
    public function __construct()
    {
        $this->forget = new Forget();

        $this->reset = new Reset();
    }

    public function restPassword(ResetPasswordRequest $request)
    {
        return $this->reset->reset($request);
    }

    public function forgetPassword(ForgetPasswordRequest $request)
    {
        return $this->forget->forget($request);
    }
}

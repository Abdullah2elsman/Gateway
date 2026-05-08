<?php

namespace App\Users\Auth;


use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\UserMeta;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\Users\ResetPasswordRequest;

class Reset
{
    public function reset(ResetPasswordRequest $request)
    {
        try
        {
            $resetToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

            if (!$resetToken || Carbon::parse($resetToken->created_at)->addMinutes(60)->isPast()) {
                return response(['status' => 'Invalid or expired token.'], 400);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response(['status' => 'User not found.'], 404);
            }

            $user->update(['password' => Hash::make($request->password)]);

            return response(["status" => "Your password has been reset successfully."], 200);
        }
        catch(\Throwable $e)
        {
            return response(["status" => "An error occurred while setting the password.", "error" => $e->getMessage()], 500);
        }
    }
}
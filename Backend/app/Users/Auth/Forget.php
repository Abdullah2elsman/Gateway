<?php

namespace App\Users\Auth;


use Exception;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\Users\ForgetPasswordRequest;

class Forget
{
    public function forget(ForgetPasswordRequest $request)
    {
        try
        {
            $token = Str::random(60);

            $email = $request->email;

            DB::table('password_reset_tokens')->insert([
                'email' => $email, 
                'token' => $token, 
                'created_at' => Carbon::now()
            ]);

            Mail::send('email.reset', ['token' => $token, 'email' => $email], function($message) use ($email) {
                $message->to($email)->subject('Reset Password Notification');
            });
        
            return response(['status' => "A password reset link has been sent to your email."], 200);
        }
        catch(Exception $e)
        {
            return response(['status' => "An error occurred or this email does not exist."], 401);
        }
    }
}
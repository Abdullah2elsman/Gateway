<?php

namespace App\Users\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;

class Login
{
    public function login(Request $request)
    {
        
        try
        {
            $user = User::where('email', $request->email)->first();

            $token_duration = Carbon::now()->addHours(6);
    
            if(!$user || !Hash::check($request->password, $user->password))
            {
                return response([
                    'message' => 'Email or password is incorrect.'
                ], 401);
            }
            else if(!$user->is_activated)
            {
                return response([
                    'message' => 'Your account is not yet activated.'
                ], 401);
            }

            $permissions = [];

            $key = 0;

            foreach($user->role->permissions as $permission)
            {
                $permissions[$permission->per_collection][$permission->per_key] = boolval($permission->per_value);
            }

            $data = [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'permissions' => $permissions,
            ];
    
            if($request->remember)
            {
                $token_duration = Carbon::now()->addDays(7);
            }
    
            $token = $user->createToken($user->full_name.'_'.Carbon::now(),['*'], $token_duration)->plainTextToken;
    
            $response = [
                'user' => $data,
                'token' => $token
            ];
    
            return response($response, 201);
        }
        catch(Exception $e)
        {
            return response(['message' => 'Something went wrong.'], 401);
        }
    }
}
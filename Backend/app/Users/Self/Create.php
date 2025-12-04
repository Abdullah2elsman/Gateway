<?php

namespace App\Users\Self;

use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserMeta;
use App\Traits\GetBranch;
use App\Traits\GetRole;
use App\Traits\CreateMeta;
use App\Users\Helpers\StoreUserAddtionalData;
use Exception;

class Create
{
    use GetRole, GetBranch, CreateMeta, StoreUserAddtionalData;

    public function create(?User $user, ?UserMeta $UserMeta, RegisterRequest $request)
    {
        try 
        {
            $user->branch_id = $this->Branch($request->branch)->id;

            $user->role_id = $this->Role(env('USER_DEFAULT_ROLE'))->id;
    
            $user->full_name = $request->full_name;
    
            $user->email = $request->email;
    
            $user->password = Hash::make($request->password);
    
            $user->is_activated = env('GUEST_DEFAULT_STATUS');

            $user->save();

            $this->StoreUserAddtionalData($UserMeta, $user->id, $request, $this);

            return response(['message' => "Account created successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be registered. Please contact the administrator of the website."], 400);
        }
    }
}
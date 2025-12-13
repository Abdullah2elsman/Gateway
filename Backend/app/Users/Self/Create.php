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

    public function create(RegisterRequest $request)
    {
        $user = new User();
        try {
            $user->branch_id = $request->branch_id ?? 2423;

            $user->role_id = 2423;

            $user->full_name = $request->full_name;

            $user->email = $request->email;

            $user->password = Hash::make($request->password);

            $user->is_activated = 1;

            $user->save();

            $this->StoreUserAddtionalData($request);

            return response(['message' => "Account created successfully."], 201);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }
    }
}

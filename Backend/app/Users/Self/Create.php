<?php

namespace App\Users\Self;

use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Traits\GetBranch;
use App\Traits\GetRole;
use App\Traits\CreateMeta;
use App\Users\Helpers\StoreUserAddtionalData;
use Exception;
use Illuminate\Support\Facades\Log;

class Create
{
    use GetRole, GetBranch, CreateMeta, StoreUserAddtionalData;

    public function create(RegisterRequest $request)
    {
        Log::info('Register Request:', $request->except('password'));
        file_put_contents(
            storage_path('logs/register_request.txt'),
            print_r($request->except('password'), true),
            FILE_APPEND
        );
        $user = new User();
        try {
            if ($request->branch === "Dokki") {
                $user->branch_id = 2423;
            } else {
                $user->branch_id = 2424;
            }
            $user->role_id = 2423;

            $user->full_name = $request->full_name;

            $user->email = $request->email;

            $user->password = Hash::make($request->password);



            $this->StoreUserAddtionalData($request);
            $user->is_activated = 0;
            $user->save();

            return response(['message' => "Account created successfully."], 201);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }
    }
}

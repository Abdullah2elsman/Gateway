<?php

namespace App\Users;

use Exception;
use App\Models\User;
use App\Traits\GetRole;
use App\Models\UserMeta;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Traits\PermissionUniqueness;
use Illuminate\Support\Facades\Gate;
use App\Users\Helpers\UserDataHelper;
use App\Traits\CheckPermissionByBranch;
use App\Users\Helpers\StoreUserAddtionalData;
use App\Users\Helpers\StoreUserEssentialData;
use App\Http\Requests\Users\CreateUserRequest;

class Create extends Permissions
{
    use GetRole, GetBranch, CreateMeta, UserDataHelper, StoreUserAddtionalData, 
    StoreUserEssentialData, PermissionUniqueness, 
    CheckPermissionByBranch, SendNotification;

    public function __construct(?User $user, $current_user)
    {
        Gate::authorize('createUser', $user);

        $this->current_user = $current_user;

        $this->permission_collection = 'users';

        $this->permission_keys = ['create_users'];

        $this->current_permission = 'create_users_by_branch';
    }

    public function create(?User $user, ?UserMeta $UserMeta, CreateUserRequest $request)
    {
        try 
        {
            $created_user = $this->StoreUserEssentialData($user, $request, 'assign_user', $this);

            $this->StoreUserAddtionalData($UserMeta, $created_user->id, $request, $this);

            $this->notifyUser('has created a new user', $this->current_user, 'create_users');

            return response(['message' => "Account created successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be registered. Please contact the administrator of the website."], 400);
        }
    }
}
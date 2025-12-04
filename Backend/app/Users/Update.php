<?php

namespace App\Users;

use Exception;
use App\Models\User;
use App\Traits\GetRole;
use App\Models\UserMeta;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Traits\UpdateMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Traits\PermissionUniqueness;
use Illuminate\Support\Facades\Gate;
use App\Users\Helpers\UserDataHelper;
use App\Traits\CheckPermissionByBranch;
use App\Users\Helpers\UpdateUserEssentialData;
use App\Users\Helpers\UpdateUserAdditionalData;


class Update extends Permissions
{
    use GetRole, GetBranch, CreateMeta, UpdateMeta, UserDataHelper, 
    UpdateUserEssentialData, UpdateUserAdditionalData, PermissionUniqueness,
    CheckPermissionByBranch, SendNotification;

    public function __construct(?User $user, $current_user, $id)
    {
        Gate::authorize('updateUser', User::find($id));

        $this->current_user = $current_user;

        $this->permissions = ['update_all', 'update_own'];

        $this->permission_collection = 'users';

        $this->permission_keys = ['update_users', 'update_own_users'];

        $this->current_permission = 'update_users_by_branch';
    }

    public function update(?User $user, ?UserMeta $UserMeta, Request $request, $id)
    {
        try 
        {
            $this->UpdateUserEssentialData($user->find($id), $request, $this);

            $this->UpdateUserAdditionalData($UserMeta, $user->find($id)->id, $request, $this);

            $this->notifyUser('has updated a user', $this->current_user, 'update_users');

            return response(['message' => "Account updated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The user cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
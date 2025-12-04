<?php

namespace App\Users\Self;

use Exception;
use App\Models\User;
use App\Traits\GetRole;
use App\Models\UserMeta;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Traits\UpdateMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\StoreImageHelper;
use App\Traits\CreateGeneralMeta;
use App\Traits\UpdateGeneralMeta;
use App\Traits\PermissionUniqueness;
use Illuminate\Support\Facades\Gate;
use App\Users\Helpers\UserDataHelper;
use App\Traits\CheckPermissionByBranch;
use App\Users\Helpers\UpdateUserEssentialData;
use App\Users\Helpers\UpdateUserAdditionalData;


class Update extends Permissions
{
    use GetRole, GetBranch, CreateMeta, UpdateMeta, UserDataHelper, UpdateUserEssentialData, UpdateUserAdditionalData, PermissionUniqueness, StoreImageHelper, CheckPermissionByBranch;

    public function __construct($current_user)
    {
        Gate::authorize('updateSelf', $current_user);

        $this->current_user = $current_user;

        $this->permissions = ['update_self'];

        $this->permission_collection = 'users';

        $this->permission_keys = ['update_self'];

        $this->current_permission = 'update_self_branch';

        $this->meta_key = 'site_logo';
    }

    public function update(?UserMeta $UserMeta, Request $request)
    {
        // try 
        // {
            $this->UpdateUserEssentialData($this->current_user, $request, $this);

            $this->UpdateUserAdditionalData($UserMeta, $this->current_user->id, $request, $this);

            return response(['message' => "Account updated successfully."], 201);
        // }
        // catch(Exception $e)
        // {
        //     return response(['message' => "Something went wrong. The user cannot be updated. Please contact the administrator of the website."], 400);
        // }
    }
}
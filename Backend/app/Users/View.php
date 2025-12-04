<?php

namespace App\Users;

use Exception;
use App\Models\User;
use App\Traits\GetBranch;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Users\Helpers\GetMetaData;
use App\Traits\CheckPermissionStatus;
use App\Users\Helpers\ViewUsersHelper;
use App\Traits\CheckPermissionByBranch;

class View extends Permissions
{
    use CheckPermissionStatus, GetBranch, GetMetaData, ViewUsersHelper, CheckPermissionByBranch;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->permission_collection = 'users';

        $this->status = true;

        $this->permission_keys = ['view_users', 'view_own_users'];

        $this->current_permission = 'view_users_by_branch';

    }

    public function view(?User $user, Request $request)
    {
        try
        {
            return $this->viewUsers($user, $request, $this);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The users cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
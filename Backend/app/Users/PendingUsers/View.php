<?php

namespace App\Users\PendingUsers;

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
    use CheckPermissionStatus, GetMetaData, GetBranch, ViewUsersHelper, CheckPermissionByBranch;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->permission_collection = 'pendingusers';

        $this->status = false;

        $this->permission_keys = ['view_pending_users'];

        $this->current_permission = 'view_pending_users_by_branch';
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
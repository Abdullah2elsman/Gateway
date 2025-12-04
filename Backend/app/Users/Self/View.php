<?php

namespace App\Users\Self;

use App\Permissions\Permissions;
use App\Traits\CheckPermissionStatus;
use App\Users\Helpers\ViewUserHelper;
use App\Traits\CheckPermissionByBranch;
use App\Users\Helpers\GetSingleUserMetaData;

class View extends Permissions
{
    use CheckPermissionStatus, GetSingleUserMetaData, ViewUserHelper, CheckPermissionByBranch;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->permission_collection = 'users';

        $this->permission_keys = ['view_self'];

        $this->current_permission = 'view_self_branch';
    }

    public function view()
    {
        try
        {
            return $this->viewUser($this);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Your data cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
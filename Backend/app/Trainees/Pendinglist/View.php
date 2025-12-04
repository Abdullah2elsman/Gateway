<?php

namespace App\Trainees\Pendinglist;

use Exception;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use Illuminate\Http\Request;
use App\Traits\GetGeneralMeta;
use App\Permissions\Permissions;
use App\Traits\CheckPermissionStatus;
use App\Traits\CheckPermissionByBranch;
use App\Trainees\Helpers\GetTraineeMeta;
use App\Trainees\Helpers\ViewTraineesHelper;

class View extends Permissions
{
    use CheckPermissionStatus, GetTraineeMeta, ViewTraineesHelper, GetGeneralMeta, GetList, GetUser, CheckPermissionByBranch, GetBranch;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->permission_collection = 'pendinglist';

        $this->list = "Pending List";

        $this->level_collection = "pendinglist_level";

        $this->keys = ['id', 'full_name', 'notes', 'attend_type'];

        $this->permission_keys = ['view_trainees'];

        $this->current_permission = 'view_trainees_by_branch';
    }

    public function view(?Trainee $trainee, Request $request)
    {
        try
        {
            return $this->viewTrainees($trainee, $request, $this);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainees cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
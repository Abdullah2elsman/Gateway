<?php

namespace App\Batches\Classes\Class;

use App\Models\Classes;
use App\Traits\GetUser;
use App\Models\TraineeClass;
use App\Traits\GetClassMeta;
use Illuminate\Http\Request;
use App\Traits\GetBranchByID;
use App\Traits\GetTraineeMeta;
use App\Traits\GetBranchByName;
use App\Traits\GetTraineeStatus;
use App\Batches\Helpers\GetClass;
use App\Traits\CheckPermissionStatus;
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\ViewClassHelper;


class View
{
    use CheckPermissionStatus, GetBranchByName, ViewClassHelper, GetTraineeMeta, GetTraineeStatus, GetClass, GetClassMeta, GetUser, CheckPermissionByBranch, GetBranchByID;
    
    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->permission_collection = 'classes';

        $this->permission_keys = ['view_classes', 'view_own_classes'];

        $this->current_permission = 'view_classes_by_branch';
    }

    public function view(?Classes $class, ?TraineeClass $trainee, $batch_id, $class_id)
    {
        try
        {    
            return $this->viewClass($class, $trainee, $batch_id, $class_id, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Classes cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
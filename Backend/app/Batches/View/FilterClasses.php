<?php

namespace App\Batches\View;

use Exception;
use App\Models\Batch;
use App\Models\Classes;
use App\Models\Trainee;
use App\Traits\GetUser;
use App\Traits\GetClassMeta;
use Illuminate\Http\Request;
use App\Traits\GetBranchByID;
use App\Traits\GetBranchByName;
use App\Traits\CheckPermissionStatus;
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\GetFilteredClasses;
use App\Batches\Helpers\ViewFilteredClassesHelper;

class FilterClasses
{
    use ViewFilteredClassesHelper, GetBranchByName, GetBranchByID, GetFilteredClasses, CheckPermissionStatus, GetClassMeta, GetUser, CheckPermissionByBranch;
    
    public function __construct($current_user)
    {
        $this->current_user = $current_user;
        
        $this->permission_collection = 'classes';

        $this->permission_keys = ['view_classes', 'view_own_classes'];

        $this->current_permission = 'view_classes_by_branch';
    }

    public function getClasses(?Classes $class, ?Batch $batch, Request $request, $batch_id)
    {
        try
        {
            return $this->viewClasses($class, $batch, $request, $batch_id, $this);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Classes cannot be viewed. Please contact the administrator of the website."], 400);
        }   
    }
}
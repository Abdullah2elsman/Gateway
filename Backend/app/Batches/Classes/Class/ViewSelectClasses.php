<?php

namespace App\Batches\Classes\Class;

use App\Models\Classes;
use App\Traits\GetUser;
use App\Traits\GetClassMeta;
use App\Traits\GetBranchByID;
use App\Permissions\Permissions;
use App\Batches\Helpers\GetClasses;
use App\Traits\CheckPermissionStatus;
use App\Batches\Helpers\ViewActiveClassesForSelect;

class ViewSelectClasses extends Permissions
{
    use CheckPermissionStatus, GetClasses, ViewActiveClassesForSelect, GetUser, GetClassMeta;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;
        
        $this->permission_collection = 'classes';
    }

    public function view(?Classes $class, $batch_id)
    {
        try
        {    
            return $this->viewClasses($class, $batch_id, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Classes cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
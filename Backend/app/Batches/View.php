<?php

namespace App\Batches;

use App\Models\Batch;
use Illuminate\Http\Request;
use App\Traits\GetBranchByID;
use App\Traits\GetBranchByName;
use App\Permissions\Permissions;
use App\Batches\Helpers\GetBatches;
use App\Traits\CheckPermissionStatus;
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\ViewBatchesHelper;
use App\Batches\Helpers\GetBatchesDataHelper;

class View extends Permissions
{
    use CheckPermissionStatus, GetBranchByName, GetBatches, GetBatchesDataHelper, ViewBatchesHelper, GetBranchByID, CheckPermissionByBranch;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;
        
        $this->permission_collection = 'batches';

        $this->permission_keys = ['view_batches', 'view_own_batches'];

        $this->current_permission = 'view_batches_by_branch';
    }

    public function view(?Batch $batch, Request $request)
    {
        try
        {    
            return $this->viewBatches($batch, $request, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
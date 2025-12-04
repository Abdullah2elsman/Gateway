<?php

namespace App\Batches\Action;

use App\Models\Batch;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;

class ActivateBatch extends Permissions
{
    use GetUser, GetBranch, CheckPermissionByBranch, SendNotification;

    public function __construct(?Batch $batch, $id)
    {
        Gate::authorize('activateBatch', $batch->find($id));

        $this->current_user = auth()->user();

        $this->permission_collection = 'batches';
        
        $this->permission_keys = ['activate_batches'];

        $this->current_permission = 'activate_batches_by_branch';
    }

    public function activateBatch(?Batch $batch, $id)
    {
        try
        {

            $current_batch = $batch->where('id', $id)->first();

            $branch_id = $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : $current_batch->branch_id;

            $batch->where('branch_id', $branch_id)->where('is_active', true)->update(['is_active' => false]);
            
            $batch->where('id', $id)->update(['is_active' => true]);

            $this->notifyUser('has activated a batch', $this->current_user, 'activate_batches');
                        
            return response(['message' => "Batch activated successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be activated. Please contact the administrator of the website."], 400);
        }
    }
}
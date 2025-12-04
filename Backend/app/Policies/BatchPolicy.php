<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Batch;
use App\Traits\CheckPermission;
use Illuminate\Auth\Access\Response;
use App\Traits\CheckPermissionByBranch;

class BatchPolicy
{
    use CheckPermission, CheckPermissionByBranch;
    
    public function __construct()
    {
        $this->permissions = ['activate-batch' => ['activate_batches', 'activate_own_batches', 'activate_batches_by_branch'],
        'end-batch' => ['end_batches', 'end_own_batches', 'end_batches_by_branch'],
        'create-batches' => ['create_batches', 'create_batches_by_branch'],
        'view-batches' => ['view_batches', 'view_own_batches', 'view_batches_by_branch'],
        'update-batches' => ['update_batches', 'update_own_batches', 'update_batches_by_branch'],
        'delete-batches' => ['delete_batches', 'delete_own_batches', 'delete_batches_by_branch'],
        'create-classes' => ['create_classes'],
        'view-classes' => ['view_classes', 'view_own_classes'],
        'update-classes' => ['update_classes', 'update_own_classes', 'update_classes_by_branch'],
        'delete-classes' => ['delete_classes', 'delete_own_classes'],
    ];

        $this->permission_collection = 'batches';

        $this->permission_keys['update'] = ['update_batches', 'update_own_batches'];

        $this->current_permission['update'] = 'update_batches_by_branch';

        $this->permission_keys['delete'] = ['delete_batches', 'delete_own_batches'];

        $this->current_permission['delete'] = 'delete_batches_by_branch';

        $this->permission_keys['activate'] = ['delete_batches', 'delete_own_batches'];

        $this->current_permission['activate'] = 'delete_batches_by_branch';

        $this->permission_keys['end'] = ['delete_batches', 'delete_own_batches'];

        $this->current_permission['end'] = 'delete_batches_by_branch';

        $this->current_user = auth()->user();
    }

    public function activateBatch(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['activate-batch'], $this->permission_collection, $batch->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['activate'], $this->permission_keys['activate'])? $this->current_user->branch_id === $batch->branch_id : true);
    }

    public function endBatch(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['end-batch'], $this->permission_collection, $batch->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['end'], $this->permission_keys['end'])? $this->current_user->branch_id === $batch->branch_id : true);
    }

    public function createBatches(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['create-batches'], $this->permission_collection);
    }

    public function viewBatches(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-batches'], $this->permission_collection, $batch->user_id);
    }

    public function updateBatches(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['update-batches'], $this->permission_collection, $batch->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $batch->branch_id : true);
    }

    public function deleteBatches(?User $current_user,?Batch $batch)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete-batches'], $this->permission_collection, $batch->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $batch->branch_id : true);
    }
}
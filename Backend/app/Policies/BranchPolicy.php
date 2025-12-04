<?php

namespace App\Policies;

use App\Models\Branch;
use App\Models\User;
use App\Traits\CheckPermission;

class BranchPolicy
{
    use CheckPermission;

    public function __construct()
    {
        $this->permissions = ['create' => ['create_branch'],
        'view' => ['view_branches'],
        'update' => ['update_branch'],
        'delete' => ['delete_branch']];

        $this->permission_collection = 'branches';
    }

    public function viewBranch(?User $current_user, ?Branch $branch)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection);
    }

    public function createBranch(?User $current_user, ?Branch $branch)
    {
        return $this->CheckPermission($current_user, $this->permissions['create'], $this->permission_collection);
    }

    public function updateBranch(?User $current_user, ?Branch $branch)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection);
    }

    public function deleteBranch(?User $current_user, ?Branch $branch)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection);
    }
}
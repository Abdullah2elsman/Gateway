<?php

namespace App\Policies;

use App\Models\User;
use App\Traits\CheckPermission;
use App\Traits\CheckPermissionByBranch;

class UserPolicy
{
    use CheckPermission, CheckPermissionByBranch;

    public function __construct()
    {
        $this->permissions = ['create' => ['create_users', 'create_users_by_branch'],
        'view' => ['view_users', 'view_own_users', 'view_users_by_branch'],
        'update' => ['update_users', 'update_own_users', 'update_users_by_branch'],
        'delete' => ['delete_users', 'delete_own_users', 'delete_users_by_branch'],
        'update-self' => ['update_self', 'update_self_branch'],
        'delete-self' => ['delete_self'],
        'activate-pending' => ['assign_activate', 'activate_users_by_branch'], 
        'delete-pending' => ['delete_pending_users', 'delete_pending_users_by_branch']];

        $this->permission_collection['users'] = 'users';

        $this->permission_collection['pendingusers'] = 'pendingusers';

        $this->permission_keys['update'] = ['update_users', 'update_own_users'];

        $this->current_permission['update'] = 'update_users_by_branch';

        $this->permission_keys['delete'] = ['delete_users', 'delete_own_users'];

        $this->current_permission['delete'] = 'update_users_by_branch';

        $this->permission_keys['activate'] = ['assign_activate'];

        $this->current_permission['activate'] = 'activate_users_by_branch';

        $this->permission_keys['delete-pending'] = ['delete_pending_users'];

        $this->current_permission['delete-pending'] = 'delete_pending_users_by_branch';

        $this->current_user = auth()->user();
    }

    public function activatePendingUser(?User $current_user, ?User $user)
    {
        return ($this->CheckPermission($current_user, $this->permissions['activate-pending'], $this->permission_collection['pendingusers']) && !boolval($user->is_activated)) && $this->CheckPermissionByBranch($this, $this->permission_collection['pendingusers'], $this->current_permission['activate'], $this->permission_keys['activate'])? $this->current_user->branch_id === $user->branch_id : true;
    }

    public function deletePendingUser(?User $current_user, ?User $user)
    {
        return ($this->CheckPermission($current_user, $this->permissions['delete-pending'], $this->permission_collection['pendingusers']) && !boolval($user->is_activated)) && $this->CheckPermissionByBranch($this, $this->permission_collection['pendingusers'], $this->current_permission['delete-pending'], $this->permission_keys['delete-pending'])? $this->current_user->branch_id === $user->branch_id : true;
    }
    
    public function viewUser(?User $current_user, ?User $user)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['users'], $user->user_id);
    }

    public function createUser(?User $user)
    {
        return $this->CheckPermission($user, $this->permissions['create'], $this->permission_collection['users']);
    }

    public function updateUser(?User $current_user, ?User $user)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['users'], $user->user_id) && $this->CheckPermissionByBranch($this, $this->permission_collection['users'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $user->branch_id : true;
    }

    public function updateSelf(?User $current_user, ?User $user)
    {
        return $this->CheckPermission($current_user, $this->permissions['update-self'], $this->permission_collection['users'], $user->id);
    }

    public function deleteUser(?User $current_user, ?User $user)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['users'], $user->user_id) && $this->CheckPermissionByBranch($this, $this->permission_collection['users'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $user->branch_id : true;
    }

    public function deleteSelf(?User $current_user, ?User $user)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete-self'], $this->permission_collection['users'], $user->id);
    }
}
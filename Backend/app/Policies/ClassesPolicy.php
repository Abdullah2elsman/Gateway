<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Classes;
use App\Models\ClassMeta;
use App\Traits\CheckPermission;
use Illuminate\Auth\Access\Response;
use App\Traits\CheckPermissionByBranch;

class ClassesPolicy
{
    use CheckPermission, CheckPermissionByBranch;
    
    public function __construct()
    {
        $this->permissions = ['create-classes' => ['create_classes', 'create_classes_by_branch'],
        'view-classes' => ['view_classes', 'view_own_classes', 'view_classes_by_branch'],
        'update-classes' => ['update_classes', 'update_own_classes', 'update_classes_by_branch'],
        'delete-classes' => ['delete_classes', 'delete_own_classes', 'delete_classes_by_branch'],
        'add-update-view-components' => ['create_classes', 
        'update_classes', 'update_own_classes', 
        'view_classes', 'view_own_classes', 
        'create_classes_by_branch', 'view_classes_by_branch',
        'update_classes_by_branch'],
        'move-to-black' => ['move_to_blacklist', 'move_to_blacklist_by_branch'],
        'move-to-refund' => ['move_to_refund', 'move_to_refund_by_branch'],
        'move-to-wait' => ['move_to_wait', 'move_to_wait_by_branch'],
        'move-to-hold' => ['move_to_hold', 'move_to_hold_by_branch'],
        'switch-class' => ['switch_class', 'switch_class_by_branch'],
        'add-admin-note' => ['add_admin_note', 'add_admin_note_by_branch'],
        'add-trainer-note' => ['add_trainer_note', 'add_own_trainer_note', 'add_trainer_note_by_branch']
    ];

        $this->permission_collection = 'classes';

        $this->permission_keys['update'] = ['update_classes', 'update_own_classes'];

        $this->current_permission['update'] = 'update_classes_by_branch';

        $this->permission_keys['delete'] = ['delete_classes', 'delete_own_classes'];

        $this->current_permission['delete'] = 'delete_classes_by_branch';

        $this->permission_keys['hold'] = ['move_to_hold'];

        $this->current_permission['hold'] = 'move_to_hold_by_branch';

        $this->permission_keys['refund'] = ['move_to_refund'];

        $this->current_permission['refund'] = 'move_to_refund_by_branch';

        $this->permission_keys['black'] = ['move_to_blacklist'];

        $this->current_permission['black'] = 'move_to_blacklist_by_branch';

        $this->permission_keys['wait'] = ['move_to_wait'];

        $this->current_permission['wait'] = 'move_to_wait_by_branch';

        $this->permission_keys['switch-class'] = ['switch_class'];

        $this->current_permission['switch-class'] = 'switch_class_by_branch';

        $this->permission_keys['add-admin-note'] = ['add_admin_note'];

        $this->current_permission['add-admin-note'] = 'add_admin_note_by_branch';

        $this->permission_keys['add-trainer-note'] = ['add_trainer_note', 'add_own_trainer_note'];

        $this->current_permission['add-trainer-note'] = 'add_trainer_note_by_branch';

        $this->current_user = auth()->user();
    }

    public function addAdminNote(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['add-admin-note'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['add-admin-note'], $this->permission_keys['add-admin-note'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function addTrainerNote(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['add-trainer-note'], $this->permission_collection, $class?->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['add-trainer-note'], $this->permission_keys['add-trainer-note'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function switchClass(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['switch-class'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['switch-class'], $this->permission_keys['switch-class'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function moveToBlack(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-black'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['black'], $this->permission_keys['black'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function moveToRefund(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-refund'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['refund'], $this->permission_keys['refund'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function moveToWait(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-wait'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['wait'], $this->permission_keys['wait'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function moveToHold(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-hold'], $this->permission_collection) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['hold'], $this->permission_keys['hold'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function authComponents(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['add-update-view-components'], $this->permission_collection);
    }

    public function createClasses(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['create-classes'], $this->permission_collection);
    }

    public function viewClasses(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-classes'], $this->permission_collection, $class?->user_id);
    }

    public function updateClasses(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['update-classes'], $this->permission_collection, $class?->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $class->branch_id : true);
    }

    public function deleteClasses(?User $current_user,?Classes $class)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete-classes'], $this->permission_collection, $class?->user_id) && ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $class->branch_id : true);
    }
}
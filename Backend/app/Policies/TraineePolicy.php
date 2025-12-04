<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Trainee;
use App\Traits\CheckPermission;
use Illuminate\Auth\Access\Response;
use App\Traits\CheckPermissionByBranch;

class TraineePolicy
{
    use CheckPermission, CheckPermissionByBranch;

    public function __construct()
    {
        $this->permissions = ['create' => ['create_trainees', 'create_trainees_by_branch'],
        'view-follow-up' => ['create_trainees', 'update_trainees', 'update_own_trainees', 'create_trainees_by_branch', 'update_trainees_by_branch'],
        'view-trainers' => ['create_trainees', 'update_trainees', 'update_own_trainees', 'create_trainees_by_branch', 'update_trainees_by_branch'],
        'add-payment' => ['create_trainees', 'update_trainees', 'update_own_trainees', 'create_trainees_by_branch', 'update_trainees_by_branch'],
        'view' => ['view_trainees', 'view_own_trainees', 'view_trainees_by_branch'],
        'update' => ['update_trainees', 'update_own_trainees', 'update_trainees_by_branch'],
        'delete' => ['delete_trainees', 'delete_own_trainees', 'delete_trainees_by_branch'],
        'assign-class' => ['assign_class', 'assign_class_by_branch'],
        'assign-trainer' => ['assign_trainer', 'assign_trainer_by_branch'],
        'assign-level' => ['assign_level', 'assign_level_by_branch'],
        'view-trainees' => ['view_trainees', 'view_trainees_by_branch'],
        'move-to-hold' => ['move_to_hold', 'move_to_hold_by_branch'],
        'move-to-refund' => ['move_to_refund', 'move_to_refund_by_branch'],
        'move-to-black' => ['move_to_blacklist', 'move_to_blacklist_by_branch'],
        'move-to-wait' => ['move_to_wait', 'move_to_wait_by_branch']];

        $this->permission_collection['waitlist'] = 'waitlist';
        $this->permission_collection['pendinglist'] = 'pendinglist';
        $this->permission_collection['holdlist'] = 'holdlist';
        $this->permission_collection['refundlist'] = 'refundlist';
        $this->permission_collection['blacklist'] = 'blacklist';
        $this->permission_collection['trainees'] = 'trainees';
        $this->permission_collection['list']['waitlist'] = 'Wait List';
        $this->permission_collection['list']['pendinglist'] = 'Pending List';
        $this->permission_collection['list']['holdlist'] = 'Hold List';
        $this->permission_collection['list']['refundlist'] = 'Refund List';
        $this->permission_collection['list']['blacklist'] = 'Blacklist';

        $this->permission_keys['update'] = ['update_trainees', 'update_own_trainees'];

        $this->current_permission['update'] = 'update_trainees_by_branch';

        $this->permission_keys['delete'] = ['delete_trainees', 'delete_own_trainees'];

        $this->current_permission['delete'] = 'delete_trainees_by_branch';

        $this->permission_keys['hold'] = ['move_to_hold'];

        $this->current_permission['hold'] = 'move_to_hold_by_branch';

        $this->permission_keys['refund'] = ['move_to_refund'];

        $this->current_permission['refund'] = 'move_to_refund_by_branch';

        $this->permission_keys['black'] = ['move_to_blacklist'];

        $this->current_permission['black'] = 'move_to_blacklist_by_branch';

        $this->permission_keys['wait'] = ['move_to_wait'];

        $this->current_permission['wait'] = 'move_to_wait_by_branch';

        $this->permission_keys['assign-class'] = ['assign_class'];

        $this->current_permission['assign-class'] = 'assign_class_by_branch';

        $this->permission_keys['assign-trainer'] = ['assign_trainer'];

        $this->current_permission['assign-trainer'] = 'assign_trainer_by_branch';

        $this->permission_keys['assign-level'] = ['assign_level'];

        $this->current_permission['assign-level'] = 'assign_level_by_branch';

        $this->current_user = auth()->user();
    }

    public function viewTrainees(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainees'], $this->permission_collection['trainees']);
    }
    
    public function assignClass(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['assign-class'], $this->permission_collection['waitlist']) && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['assign-class'], $this->permission_keys['assign-class'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveWaitToHold(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-hold'], $this->permission_collection['waitlist']) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['hold'], $this->permission_keys['hold'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveWaitToRefund(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-refund'], $this->permission_collection['waitlist']) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['refund'], $this->permission_keys['refund'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveWaitToBlack(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-black'], $this->permission_collection['waitlist']) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['black'], $this->permission_keys['black'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function viewTrainers(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainers'], $this->permission_collection['waitlist']);
    }

    public function viewTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['waitlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'];
    }

    public function createTrainee(User $current_user, Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['create'], $this->permission_collection['waitlist']);
    }

    public function updateTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['waitlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function deleteTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['waitlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['waitlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['waitlist'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function assignTrainer(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['assign-trainer'], $this->permission_collection['pendinglist']) && $trainee->list->list_title === $this->permission_collection['list']['pendinglist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['pendinglist'], $this->current_permission['assign-trainer'], $this->permission_keys['assign-trainer'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function assignLevel(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['assign-level'], $this->permission_collection['pendinglist']) && $trainee->list->list_title === $this->permission_collection['list']['pendinglist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['pendinglist'], $this->current_permission['assign-level'], $this->permission_keys['assign-level'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function addPendingPayment(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['add-payment'], $this->permission_collection['pendinglist']);
    }

    public function addPendingLevel(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['assign-level'], $this->permission_collection['pendinglist']);
    }

    public function viewPendingLevels(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['assign-level'], $this->permission_collection['pendinglist']);
    }

    public function viewFollowUp(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-follow-up'], $this->permission_collection['pendinglist']);
    }

    public function viewPendingTrainers(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainers'], $this->permission_collection['pendinglist']);
    }

    public function viewPendingTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['pendinglist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['pendinglist'];
    }

    public function createPendingTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['create'], $this->permission_collection['pendinglist']);
    }

    public function updatePendingTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['pendinglist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['pendinglist']  && $this->CheckPermissionByBranch($this, $this->permission_collection['pendinglist'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function deletePendingTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['pendinglist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['pendinglist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['pendinglist'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveHoldToWait(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-wait'], $this->permission_collection['holdlist']) && $trainee->list->list_title === $this->permission_collection['list']['holdlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['holdlist'], $this->current_permission['wait'], $this->permission_keys['wait'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function viewHoldTrainers(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainers'], $this->permission_collection['holdlist']);
    }

    public function viewHoldTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['holdlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['holdlist'];
    }

    public function updateHoldTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['holdlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['holdlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['holdlist'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function deleteHoldTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['holdlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['holdlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['holdlist'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveRefundToWait(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-wait'], $this->permission_collection['refundlist']) && $trainee->list->list_title === $this->permission_collection['list']['refundlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['refundlist'], $this->current_permission['wait'], $this->permission_keys['wait'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function viewRefundTrainers(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainers'], $this->permission_collection['refundlist']);
    }

    public function viewRefundTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['refundlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['refundlist'];
    }

    public function updateRefundTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['refundlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['refundlist']  && $this->CheckPermissionByBranch($this, $this->permission_collection['refundlist'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function deleteRefundTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['refundlist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['refundlist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['refundlist'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function moveBlackToWait(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['move-to-wait'], $this->permission_collection['refundlist']) && $trainee->list->list_title === $this->permission_collection['list']['blacklist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['blacklist'], $this->current_permission['wait'], $this->permission_keys['wait'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function viewBlackTrainers(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-trainers'], $this->permission_collection['pendinglist']);
    }

    public function viewBlackTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['view'], $this->permission_collection['blacklist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['blacklist'];
    }

    public function updateBlackTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['update'], $this->permission_collection['blacklist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['blacklist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['blacklist'], $this->current_permission['update'], $this->permission_keys['update'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }

    public function deleteBlackTrainee(?User $current_user, ?Trainee $trainee)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete'], $this->permission_collection['blacklist'], $trainee->user_id) && $trainee->list->list_title === $this->permission_collection['list']['blacklist'] && $this->CheckPermissionByBranch($this, $this->permission_collection['blacklist'], $this->current_permission['delete'], $this->permission_keys['delete'])? $this->current_user->branch_id === $trainee->branch_id : true;
    }
}
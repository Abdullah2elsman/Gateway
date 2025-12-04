<?php

namespace App\Http\Controllers\Dashboard\Lists;

use App\Models\User;
use App\Models\Trainee;
use App\Models\Permission;
use App\Models\GeneralMeta;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Trainees\Pendinglist\View;
use App\Http\Controllers\Controller;
use App\Trainees\Pendinglist\Create;
use App\Trainees\Pendinglist\Update;
use App\Trainees\Pendinglist\Show\Levels;
use App\Trainees\Pendinglist\Add\AddLevel;
use App\Trainees\Pendinglist\Show\FollowUp;
use App\Trainees\Pendinglist\Show\Trainers;
use App\Trainees\Pendinglist\Deletes\Delete;
use App\Trainees\Pendinglist\Add\AddPaymentType;
use App\Trainees\Pendinglist\Assign\AssignLevel;
use App\Trainees\Pendinglist\Deletes\BulkDelete;
use App\Trainees\Pendinglist\Assign\AssignTrainer;
use App\Trainees\Pendinglist\Show\ViewPaymentTypes;
use App\Trainees\Pendinglist\Assign\BulkAssignLevel;
use App\Trainees\Pendinglist\Assign\BulkAssignTrainer;
use App\Trainees\Pendinglist\Deletes\DeleteLevel as PendingDeleteLevel;
use App\Trainees\Pendinglist\Deletes\DeletePaymentType;

class PendinglistController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function addPayment(?Trainee $trainee, ?GeneralMeta $meta, Request $request)
    {
        $this->trainee['add-payment'] = new AddPaymentType($trainee);

        return $this->trainee['add-payment']->addPaymentType($meta, $request);
    }

    public function deletePayment($id)
    {
        $this->trainee['delete-payment'] = new DeletePaymentType();

        return $this->trainee['delete-payment']->deletePaymentType($id);
    }

    public function addLevel(?Trainee $trainee, ?GeneralMeta $level, Request $request)
    {
        $this->trainee['add-level'] = new AddLevel($trainee);

        return $this->trainee['add-level']->addLevel($level, $request);
    }

    public function deleteLevel(?Trainee $trainee, ?GeneralMeta $level, $id)
    {
        $this->trainee['delete-level'] = new PendingDeleteLevel($trainee);

        return $this->trainee['delete-level']->deleteLevel($level, $trainee, $id);
    }

    public function assignLevel(?Trainee $trainee, ?GeneralMeta $level, Request $request, $trainee_id)
    {
        $this->trainee['assign-level'] = new AssignLevel($trainee, $trainee_id);

        return $this->trainee['assign-level']->assign($trainee, $level, $request, $trainee_id);
    }

    public function bulkAssignLevel(?Trainee $trainee, ?GeneralMeta $level, Request $request)
    {
        $this->trainee['bulk-assign-level'] = new BulkAssignLevel();

        return $this->trainee['bulk-assign-level']->assign($trainee, $level, $request);
    }

    public function assignTrainer(Trainee $trainee, ?User $trainer, Request $request, $trainee_id)
    {
        $this->trainee['assign-trainer'] = new AssignTrainer($trainee, $trainee_id);

        return $this->trainee['assign-trainer']->assign($trainee, $trainer, $request, $trainee_id);
    }

    public function bulkAssignTrainer(Trainee $trainee, ?User $trainer, Request $request)
    {
        $this->trainee['bulk-assign-trainer'] = new BulkAssignTrainer();

        return $this->trainee['bulk-assign-trainer']->assign($trainee, $trainer, $request);
    }

    public function viewPayment(?Trainee $trainee, ?GeneralMeta $meta)
    {
        $this->trainee['view-payment'] = new ViewPaymentTypes($trainee);

        return $this->trainee['view-payment']->viewPaymentTypes($meta);
    }

    public function viewFollowUp(?Trainee $trainee, ?User $user, ?Permission $permission)
    {
        $this->trainee['follow_up'] = new FollowUp($trainee);

        return $this->trainee['follow_up']->show($user, $permission);
    }

    public function viewLevels(?Trainee $trainee, ?GeneralMeta $level)
    {
        $this->trainee['levels'] = new Levels($trainee);

        return $this->trainee['levels']->viewLevels($level);
    }

    public function viewTrainers(?Trainee $trainee, ?User $user, ?Permission $permission)
    {
        $this->trainee['trainers'] = new Trainers($trainee);

        return $this->trainee['trainers']->show($user, $permission);
    }

    public function view(?Trainee $trainee, Request $request)
    {
        $this->trainee['view'] = new View($this->current_user);

        return $this->trainee['view']->view($trainee, $request);
    }

    public function create(?Trainee $trainee, ?TraineeMeta $TraineeMeta, Request $request)
    {
        $this->trainee['create'] = new Create($trainee, $this->current_user);

        return $this->trainee['create']->create($trainee, $TraineeMeta, $request);
    }

    public function update(?Trainee $trainee, ?TraineeMeta $TraineeMeta, Request $request, $id)
    {
        $this->trainee['update'] = new Update($trainee, $this->current_user, $id);

        return $this->trainee['update']->update($trainee, $TraineeMeta, $request, $id);
    }


    public function delete(?Trainee $trainee, $id)
    {
        $this->trainee['delete'] = new Delete($trainee, $id);

        return $this->trainee['delete']->delete($trainee, $id);
    }

    public function bulkDelete(?Trainee $trainee, Request $request)
    {
        $this->trainee['delete'] = new BulkDelete();

        return $this->trainee['delete']->delete($trainee, $request);
    }
}
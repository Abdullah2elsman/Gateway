<?php

namespace App\Http\Controllers\Dashboard\Batches\Classes;

use App\Models\Classes;
use App\Models\Trainee;
use App\Models\Attendance;
use App\Models\TraineeMeta;
use App\Models\TraineeClass;
use Illuminate\Http\Request;
use App\Batches\Classes\Class\View;
use App\Http\Controllers\Controller;
use App\Batches\Classes\UpdatePaymentFees;
use App\Batches\Classes\Class\Confirmation;
use App\Batches\Classes\Class\ViewAdminNote;
use App\Batches\Classes\Class\Add\AddAdminNote;
use App\Batches\Classes\Class\ViewSelectClasses;
use App\Batches\Classes\Class\Attendance\AddTrainerNote;
use App\Batches\Classes\Class\Attendance\ViewTrainerNote;

class ClassController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function updateTraineePayment(?Classes $class, ?TraineeMeta $TraineeMeta, Request $request, $trainee_id)
    {
        $this->class['update-payment'] = new UpdatePaymentFees($class, $request);

        return $this->class['update-payment']->update($TraineeMeta, $request, $trainee_id);
    }

    public function confirmation(?Classes $class, ?TraineeClass $trainee_class, Request $request, $class_id, $trainee_id)
    {
        $this->class['confirmation'] = new Confirmation($class, $class_id);

        return $this->class['confirmation']->confirm($trainee_class, $request, $class_id, $trainee_id);
    }

    public function viewAdminNote(?Classes $class, ?Attendance $attendance, $class_id, $trainee_id)
    {
        $this->class['view-admin-note'] = new ViewAdminNote($class, $class_id);

        return $this->class['view-admin-note']->view($attendance, $class_id, $trainee_id);
    }

    public function viewTrainerNote(?Classes $class, ?Attendance $attendance, $class_id, $trainee_id)
    {
        $this->class['view-trainer-note'] = new ViewTrainerNote($class, $class_id);

        return $this->class['view-trainer-note']->view($attendance, $class_id, $trainee_id);
    }

    public function addAdminNote(?Classes $class, ?Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        $this->class['add-admin-note'] = new AddAdminNote($class, $class_id);

        return $this->class['add-admin-note']->addAdminNote($attendance, $request, $class_id, $trainee_id);
    }

    public function addTrainerNote(?Classes $class, ?Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        $this->class['add-admin-note'] = new AddTrainerNote($class, $class_id, $this->current_user);

        return $this->class['add-admin-note']->addTrainerNote($class, $attendance, $request, $class_id, $trainee_id);
    }
    
    public function viewClass(?Classes $class, ?TraineeClass $trainee, $batch_id, $class_id)
    {
        $this->class['view'] = new View($this->current_user);

        return $this->class['view']->view($class, $trainee, $batch_id, $class_id);
    }

    public function viewClasses(Classes $class, $batch_id)
    {
        $this->class['view-classes'] = new ViewSelectClasses($this->current_user);

        return $this->class['view-classes']->view($class, $batch_id);
    }
}
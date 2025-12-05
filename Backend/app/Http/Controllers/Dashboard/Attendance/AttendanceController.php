<?php

namespace App\Http\Controllers\Dashboard\Attendance;

use App\Models\Classes;
use App\Models\Attendance;
use App\Models\SessionNote;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Batches\Classes\Class\Add\AddToAttendance;
use App\Batches\Classes\Class\Attendance\AddSessionNote;
use App\Batches\Classes\Class\Attendance\ViewAttendance;
use App\Batches\Classes\Class\Attendance\ViewSessionNotes;
use App\Batches\Classes\Class\Attendance\UpdateSessionNote;
use App\Batches\Classes\Class\Attendance\ViewOwnAttendance;
use App\Batches\Classes\Class\Attendance\ToggleSessionStatus;

class AttendanceController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function viewSessionNote(?Classes $class, SessionNote $session_note, Attendance $attendance, $class_id, $trainee_id)
    {
        $this->attendance['view-session-notes'] = new ViewSessionNotes($attendance, $this->current_user);

        return $this->attendance['view-session-notes']->viewSessionNote($class, $session_note, $attendance, $class_id, $trainee_id);
    }

    public function addSessionNote(SessionNote $session_note, Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        $this->attendance['add-session-notes'] = new AddSessionNote($attendance);

        return $this->attendance['add-session-notes']->addSessionNote($session_note, $attendance, $request, $class_id, $trainee_id);
    }

    public function updateSessionNote(Attendance $attendance, SessionNote $session_note, Request $request, $session_id)
    {
        $this->attendance['update-session-notes'] = new UpdateSessionNote($attendance, $this->current_user);

        return $this->attendance['update-session-notes']->updateSessionNote($session_note, $request, $session_id);
    }

    public function view(?Attendance $attendance, $class_id)
    {
        $this->attendance['view'] = new ViewAttendance($attendance, $this->current_user);

        return $this->attendance['view']->view($attendance, $class_id);
    }

    public function viewOwn(?Attendance $attendance)
    {
        $this->attendance['view-own'] = new ViewOwnAttendance($attendance, $this->current_user);

        return $this->attendance['view-own']->view($attendance);
    }

    public function toggleSessionStatus(SessionNote $session_note, $session_id)
    {
        $this->attendance['toggle-status'] = new ToggleSessionStatus();

        return $this->attendance['toggle-status']->toggle($session_note, $session_id);
    }
}

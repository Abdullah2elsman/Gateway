<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use App\Models\SessionNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionStatus;
use App\Batches\Helpers\GetSessionNotes;


class ViewSessionNotes
{
    use CheckPermissionStatus, GetSessionNotes;
    
    public function __construct(Attendance $attendance, $current_user)
    {
        $this->permission_collection = 'attendance';

        $this->current_user = $current_user;
    }

    public function viewSessionNote(Classes $class, SessionNote $session_note, Attendance $attendance, $class_id, $trainee_id)
    {
        try
        {
            $session_notes = [];
            
            $current_class = $class->where('id', $class_id)->first();
            
            $this->CheckPermissionStatus($this->current_user, $this->permission_collection, 'view_session_notes') && $session_notes =  $this->viewSessions($session_note, $attendance, $class_id, $trainee_id, $this);

            ($this->CheckPermissionStatus($this->current_user, $this->permission_collection, 'view_own_session_notes') && $current_class->trainer_id === $this->current_user->id && count($session_notes) <= 0) 
            
            && $session_notes = $this->viewSessions($session_note, $attendance, $class_id, $trainee_id, $this);

            $num_of_sessions = $attendance->where('class_id', $class_id)->where('trainee_id', $trainee_id)->count();

            $sub_message = $num_of_sessions === 0?  response(['message' => "No sessions have been conducted for this class."], 200) : response(['message' => 'Unauthorized'], 401);

            $message = count($session_notes) === 0? $sub_message : response($session_notes, 200);

            return $message;
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Session notes cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Models\Attendance;
use App\Models\SessionNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;


class AddSessionNote
{
    use CheckPermissionByBranch;

    public function __construct(Attendance $attendance)
    {
        Gate::authorize('addSessionNotes', $attendance);

        $this->permission_collection = 'attendance';

        $this->permission_keys = ['add_session_notes', 'add_own_session_notes'];

        $this->current_permission = 'add_session_notes_by_branch';

        $this->current_user = auth()->user();
    }

    public function addSessionNote(SessionNote $session_note, Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        try
        {
            $by_branch = false;

            $current_attendance = $attendance->where('class_id', $class_id)->where('trainee_id', $trainee_id)->first();

            $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $by_branch = false : $by_branch = true;

            ($by_branch && $current_attendance->class->branch_id === $this->current_user->branch_id) && $by_branch = false;

            if(!$current_attendance || $by_branch)
            {
                return response(['message' => 'Trainee not found in the given class.'], 400);
            }
            
            $session_note->create([
                'attend_id' => $current_attendance->id,
                'session_title' => $request->session_title,
                'session_status' => false
            ]);

            return response(['message' => 'Session note added successfully.'], 200);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Session note cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
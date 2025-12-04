<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Models\Attendance;
use App\Models\SessionNote;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;


class UpdateSessionNote
{
    use CheckPermissionByBranch, SendNotification;

    public function __construct(Attendance $attendance, $current_user)
    {
        Gate::authorize('addSessionNotes', $attendance);

        $this->current_user = $current_user;

        $this->permission_collection = 'attendance';

        $this->permission_keys = ['add_session_notes', 'add_own_session_notes'];

        $this->current_permission = 'add_session_notes_by_branch';
    }

    public function updateSessionNote(SessionNote $session_note, Request $request, $session_id)
    {
        try
        {
            $by_branch = false;

            $current_session_note = $session_note->where('id', $session_id);

            $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $by_branch = false : $by_branch = true;

            ($by_branch && $current_session_note->first()->attendance->class->branch_id === $this->current_user->branch_id) && $by_branch = false;

            $current_class = $current_session_note->first()->attendance->class;

            $is_authorized = $current_class->trainer_id === $this->current_user->id;
            
            if(!$current_session_note->exists() || !$is_authorized || $by_branch)
            {
                return response(['message' => 'Session does not exist'], 400);
            }

            $current_session = $current_session_note->first();

            $request->filled('session_title') && $current_session->session_title = $request->session_title;

            $request->filled('session_status') && $current_session->session_status = $request->session_status;

            $current_session->save();

            $this->notifyUser('has updated a trainee session notes', $this->current_user, 'add_session_notes');

            return response(['message' => 'Session note updated successfully.'], 200);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Session note cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Models\SessionNote;
use Illuminate\Http\Request;

class ToggleSessionStatus
{
    protected $current_user;

    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function toggle(SessionNote $session_note, $session_id)
    {
        try {
            // Find the session note with relationships
            $session = $session_note->with(['attendance.class'])->find($session_id);

            if (!$session) {
                return response(['message' => 'Session not found'], 404);
            }

            // Check if attendance exists
            if (!$session->attendance) {
                return response(['message' => 'Attendance record not found'], 404);
            }

            // Check if class exists
            if (!$session->attendance->class) {
                return response(['message' => 'Class not found'], 404);
            }

            // Check if the logged-in user is the trainer of this class
            $trainer_id = $session->attendance->class->trainer_id;

            if ($trainer_id !== $this->current_user->id) {
                return response([
                    'message' => 'Unauthorized. Only the class trainer can update session status.'
                ], 403);
            }

            // Toggle session_status: if 1 make it 0, if 0 make it 1
            $session->session_status = $session->session_status == 1 ? 0 : 1;
            $session->save();

            return response([
                'message' => 'Session status updated successfully',
                'session_status' => $session->session_status
            ], 200);
        } catch (Exception $e) {
            \Log::error('ToggleSessionStatus Error: ' . $e->getMessage(), [
                'session_id' => $session_id,
                'user_id' => $this->current_user->id ?? null,
                'trace' => $e->getTraceAsString()
            ]);

            return response([
                'message' => 'Something went wrong. Please try again.',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

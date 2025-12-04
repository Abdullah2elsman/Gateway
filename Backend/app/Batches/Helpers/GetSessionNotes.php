<?php

namespace App\Batches\Helpers;

trait GetSessionNotes
{
    protected function viewSessions($session_note, $attendance, $class_id, $trainee_id, $class)
    {
        $current_attendance = $attendance->where('class_id', $class_id)->where('trainee_id', $trainee_id)->first();

        if(!$current_attendance)
        {
            return response(['message' => 'Trainee not found in the given class.'], 400);
        }
        
        $session_notes = $session_note->where('attend_id', $current_attendance->id)->get();

        $sessions_collection = [];

        foreach((object) $session_notes as $key => $s_note)
        {
            $sessions_collection[$key] = ['id' => $s_note->id, 'session_title' => $s_note->session_title, 'session_status' => $s_note->session_status];
        }

        return $sessions_collection;
    }
}
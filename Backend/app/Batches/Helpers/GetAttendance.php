<?php

namespace App\Batches\Helpers;

use App\Models\Attendance;
use App\Models\SessionNote;
use App\Models\TraineeClass;

trait GetAttendance
{
    protected function getCollection($attendances, $class_id, $class)
    {        
        $trainees_collection = [];

        $meta_collection = [];

        $current_class = $class->getClass($class_id);

        $class_collection = [];
        
        $gate_collection = [];

        foreach((object) $attendances as $key => $meta)
        {

            foreach($meta?->trainees as $trainee)
            {   
                foreach($trainee->trainee_meta as $t_meta)
                {
                    str_contains($t_meta->meta_key, 'phone_number') && $meta_collection[$t_meta->meta_key] = $t_meta->meta_value;
                }

                $session_note = new SessionNote();

                $attendance = new Attendance();
                
                $trainees_collection['trainees'][$key] = [
                    'id' => $trainee?->id,
                    'full_name' => $trainee?->full_name,
                    ...$meta_collection,
                    'session_notes' => $class->viewSessions($session_note, $attendance, $class_id, $trainee->id, $class),
                    'trainer_note' => $meta->trainer_note,
                    'admin_note' => $meta->admin_note,
                    'comment' => $meta->comment,
                    'total_attend' => SessionNote::where('attend_id', $meta->id)->where('session_status', true)->count()
                ];
            }
        }

        $current_class->class_type === 'Online' && $gate_collection = [
            'gate_url' => $current_class->gate_url,
            'gate_password' => $current_class->gate_password,
        ];
        
        $class_collection = [
            'id' => $current_class->id,
            'trainer' => $class->User($current_class->trainer_id)?->full_name,
            'class_name' => $current_class?->class_name,
            'class_type' => $current_class?->class_type,
            'gate' => $class?->meta($current_class->gate)?->first()?->meta_value,
            ... $gate_collection,
            'time_slot' => $class->meta($current_class->time_slot)->first()?->meta_value,
            'level' => $class->meta($current_class->level)->first()?->meta_value,
            'num_of_trainees' => TraineeClass::where('class_id', $current_class->id)->count(),
            'num_of_confirmation' => TraineeClass::where('class_id', $current_class->id)->where('confirmation', true)->count(),
            ...$trainees_collection
        ];

  

        return $class_collection;
    }
}
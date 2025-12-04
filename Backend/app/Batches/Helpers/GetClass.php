<?php

namespace App\Batches\Helpers;

use App\Models\Attendance;
use App\Models\TraineeClass;

trait GetClass
{
    protected function getCollection($current_class, $trainee_class, $this_class)
    {
        $trainees_meta = $trainee_class->where('class_id', $current_class?->id)?->get();
        
        $trainees_collection = [];

        $meta_collection = [];

    

        foreach((object) $trainees_meta as $key => $meta)
        {
            foreach($meta?->trainees as $trainee)
            {   
                foreach($trainee->trainee_meta as $t_meta)
                {
                    str_contains($t_meta->meta_key, 'phone_number') && $meta_collection[$t_meta->meta_key] = $t_meta->meta_value;
                }
                
                $trainees_collection[$key] = [
                    'id' => $trainee?->id,
                    'status' => $this_class->status($trainee->id) <= 1 ? 'New Test' : 'Current Test',
                    'full_name' => $trainee?->full_name,
                    ...$meta_collection,
                    'payment' => $this_class?->getMeta($trainee, 'paid_value')?->meta_value,
                    'confirmation' => boolval(TraineeClass::where('class_id', $current_class?->id)->where('trainee_id', $trainee?->id)->first()->confirmation),
                    'trainer_note' => Attendance::where('class_id', $current_class?->id)->where('trainee_id', $trainee?->id)->first()?->trainer_note,
                    'admin_note' => Attendance::where('class_id', $current_class?->id)->where('trainee_id', $trainee?->id)->first()?->admin_note,
                    'result' => Attendance::where('class_id', $current_class?->id)->where('trainee_id', $trainee?->id)->first()?->result,
                ];
            }
        }

            $collection = [
                'id' => $current_class?->id,
                'branch' => $this_class?->Branch($current_class?->branch_id)?->first()->district,
                'trainer' => $this_class->User($current_class->trainer_id)?->full_name,
                'class_name' => $current_class?->class_name,
                'class_type' => $current_class?->class_type,
                'gate' => $this_class?->meta($current_class->gate)?->first()?->meta_value,
                'time_slot' => $this_class->meta($current_class->time_slot)->first()?->meta_value,
                'level' => $this_class->meta($current_class->level)->first()?->meta_value,
                'num_of_trainees' => TraineeClass::where('class_id', $current_class->id)->count(),
                'num_of_confirmation' => TraineeClass::where('class_id', $current_class->id)->where('confirmation', true)->count(),
                'trainees' => $trainees_collection
            ];

        
        return $collection;
    }
}
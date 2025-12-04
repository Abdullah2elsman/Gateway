<?php

namespace App\Batches\Helpers;

use Carbon\Carbon;
use App\Models\TraineeClass;
use App\Models\TraineeMeta;

trait GetClasses
{
    protected function getCollection($classes, $this_class)
    {
        $classes_collection = [];
            
        foreach((object) $classes as $key => $class)
        {
            $classes_collection[$key] = [
                'id' => $class?->id,
                'trainer' => $this_class->User($class->trainer_id)?->full_name,
                'class_name' => $class?->class_name,
                'class_type' => $class?->class_type,
                'gate' => $this_class?->meta($class->gate)?->first()?->meta_value,
                "gate_url" => $class?->gate_url,
                "gate_password" => $class?->gate_password,
                'time_slot' => $this_class->meta($class->time_slot)->first()?->meta_value,
                'level' => $this_class->meta($class->level)->first()?->meta_value,
                'num_of_trainees' => TraineeClass::where('class_id', $class->id)->count(),
                'num_of_confirmation' => TraineeClass::where('class_id', $class->id)->where('confirmation', true)->count()
            ];
        }
        
        return $classes_collection;
    }
}
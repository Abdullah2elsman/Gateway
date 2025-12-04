<?php

namespace App\Traits;

use App\Models\Trainee;
use App\Models\TraineeClass;

trait DeleteTraineesOnClassDelete
{
    protected function deleteTrainees($class)
    {
            $trainee_classes = TraineeClass::where('class_id', $class->id)->get();

            foreach ($trainee_classes as $trainee_class) 
            {
                TraineeClass::where('trainee_id',  $trainee_class->trainee_id)->count() <= 1 
                &&
                Trainee::where('id',  $trainee_class->trainee_id)->delete();
            }
    }
}
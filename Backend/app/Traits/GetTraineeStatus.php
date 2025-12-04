<?php

namespace App\Traits;

use App\Models\TraineeClass;


trait GetTraineeStatus
{
    protected function status($trainee_id)
    {
        return TraineeClass::where('trainee_id', $trainee_id)->count();
    }
}
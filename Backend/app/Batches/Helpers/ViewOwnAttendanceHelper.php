<?php

namespace App\Batches\Helpers;

use App\Models\Classes;

trait ViewOwnAttendanceHelper
{
    protected function viewAttendance($attendances, $class)
    {
        $attendances_data = [];

        $classes = Classes::where('trainer_id', $class->current_user->id)->get();

        foreach($classes as $key => $a_class)
        {
            $current_attendance = $attendances->where("class_id", $a_class->id)->get();

            $attendances_data[$key] = $class?->getCollection($current_attendance, $a_class->id, $class);
        }
    
        $num_attendance = count($attendances_data);

        $message = $num_attendance === 0 ? response(['message' => "Attendances is empty."], 200) : response(["attendances" => $attendances_data], 200);

        return $message;
    }
}
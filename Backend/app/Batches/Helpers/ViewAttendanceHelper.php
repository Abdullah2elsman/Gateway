<?php

namespace App\Batches\Helpers;

use App\Models\Classes;

trait ViewAttendanceHelper
{
    protected function viewAttendance($attendances, $class_id, $class)
    {
        $attendances_data = [];
        
        $current_attendance = $attendances->where("class_id", $class_id)->get();

        $attendances_data = $class?->getCollection($current_attendance, $class_id, $class);

        if($class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) 
        && Classes::where('id', $class_id)->first()->branch_id !== $class->current_user->branch_id)
        {
            $message = response(['message' => "Unauthorized."], 401);
        }

        $num_attendance = count($attendances_data);

        $message = $num_attendance === 0 ? response(['message' => "Attendance is empty."], 200) : response($attendances_data, 200);

        return $message;
    }
}
<?php

namespace App\Batches\Classes\Class\Add;


use Exception;
use App\Models\Attendance;
use Illuminate\Support\Facades\Gate;


class AddToAttendance
{
    public function __construct(?Attendance $attendance, $current_user)
    {
        Gate::authorize('addToAttendance', $attendance);
    }

    public function addToAttendance(?Attendance $attendance, $class_id, $trainee_id)
    {
        try
        {
            $is_exists = $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();
            
            if($is_exists)
            {
                return response(['message' => "Trainee already exists in attendance."], 400); 
            }

            $attendance->create([
                "class_id" => $class_id,
                "trainee_id" => $trainee_id, 
            ]);

            return response(['message' => "Trainee added to attendance successfully."], 201);  
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Trainee cannot be added to attendance. Please contact the administrator of the website."], 400);
        }
    }
}
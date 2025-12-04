<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use Illuminate\Support\Facades\Gate;

class ViewTrainerNote
{
    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('addTrainerNote', $class->find($class_id));
    }

    public function view(?Attendance $attendance, $class_id, $trainee_id)
    {
        try
        {
            $is_exists = $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();

            if($is_exists)
            {
                $trainer_note =  $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->first();
                
                
                return response(['trainer_note' => $trainer_note?->trainer_note], 200);
            }

            return response(['message' => "Cannot view admin note. This trainee is not exists in attendance."], 200);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Admin note cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Batches\Classes\Class;

use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use Illuminate\Support\Facades\Gate;

class ViewAdminNote
{
 

    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('addAdminNote', $class->find($class_id));
    }

    public function view(?Attendance $attendance, $class_id, $trainee_id)
    {
        try
        {
            $is_exists = $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();

            if($is_exists)
            {
                $admin_note =  $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->first();
                
                
                return response(['admin_note' => $admin_note?->admin_note], 200);
            }

            return response(['message' => "Cannot view admin note. This trainee is not exists in attendance."], 200);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Admin note cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
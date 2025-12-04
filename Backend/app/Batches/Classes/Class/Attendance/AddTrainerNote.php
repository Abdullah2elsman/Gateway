<?php

namespace App\Batches\Classes\Class\Attendance;


use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;


class AddTrainerNote
{
    use SendNotification;

    public function __construct(?Classes $class, $class_id, $current_user)
    {
        Gate::authorize('addTrainerNote', $class->find($class_id));

        $this->current_user = $current_user;
    }

    public function addTrainerNote(?Classes $class, ?Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        try
        {
            $is_exists = $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();

            $is_authorized = $class->where("id", $class_id)->first()?->trainer_id === $this->current_user?->id;
            
            if(!$is_exists || !$is_authorized)
            {
                return response(['message' => "Cannot add trainer note. This trainee is not exists in attendance."], 400);
            }

            $request->filled('trainer_note') && $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->update([
                "trainer_note" => $request->trainer_note,
            ]);

            $request->filled('comment') && $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->update([
                "comment" => $request->comment,
            ]);

            $this->notifyUser('has added a trainer note to a trainee', $this->current_user, 'add_admin_note');
            
            return response(['message' => "Trainer note added successfully."], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Trainer note cannot be added to trainee. Please contact the administrator of the website."], 400);
        }
    }
}
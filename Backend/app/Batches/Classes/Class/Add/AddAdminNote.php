<?php

namespace App\Batches\Classes\Class\Add;


use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;


class AddAdminNote
{
    use SendNotification;

    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('addAdminNote', $class->find($class_id));

        $this->current_user = auth()->user();
    }

    public function addAdminNote(?Attendance $attendance, Request $request, $class_id, $trainee_id)
    {
        try
        {
            $is_exists = $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();
            
            if($is_exists)
            {
                $attendance->where("class_id", $class_id)->where("trainee_id", $trainee_id)->update([
                    "admin_note" => $request->admin_note,
                ]);

                $this->notifyUser('has added an admin note to a trainee', $this->current_user, 'add_admin_note');
                
                return response(['message' => "Admin note added successfully."], 200);
            }

            return response(['message' => "Cannot add admin note. This trainee is not exists in attendance."], 400);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Admin note cannot be added to trainee. Please contact the administrator of the website."], 400);
        }
    }
}
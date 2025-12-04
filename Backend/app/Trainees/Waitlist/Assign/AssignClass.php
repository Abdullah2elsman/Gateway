<?php

namespace App\Trainees\Waitlist\Assign;

use Exception;
use App\Models\Trainee;
use App\Models\Attendance;
use App\Models\SessionNote;
use App\Models\TraineeClass;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AssignClass 
{
    use SendNotification;

    public function __construct(?Trainee $trainee, $trainee_id)
    {
        Gate::authorize('assignClass', $trainee->find($trainee_id));

        $this->current_user = auth()->user();
    }

    public function assign(?Trainee $trainee, ?TraineeClass $trainee_class, Request $request, $trainee_id)
    {
        try
        {
            $is_exists = $trainee_class->where('class_id', $request->class_id)->where('trainee_id', $trainee_id)->exists();
            
            if ($is_exists) 
            {
                return response(['message' => "Class is already assigned to this trainee."], 400);
            }

            $current_trainee = $trainee->find($trainee_id);

            $current_trainee->pervious_list = $current_trainee->current_list;

            $current_trainee->current_list = null;

            $current_trainee->save();
            
            $trainee_class->create([
                'class_id' => $request->class_id,
                'trainee_id' => $trainee_id,
                'confirmation' => false
            ]);

            $attendance = Attendance::create([
                "class_id" => $request->class_id,
                "trainee_id" => $trainee_id, 
            ]);
            
            for ($i = 0; $i < 8; $i++)
            {
                SessionNote::create([
                    'attend_id' =>  $attendance->id,
                    'session_title' => '',
                    'session_status' => false
                ]);
            }

            $this->notifyUser('has assigned a trainee to a class', $this->current_user, 'assign_class');

            return response(['message' => "Class assigned successfully."], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Cannot assign class. Please contact the administrator of the website."], 400);
        }
    }
}
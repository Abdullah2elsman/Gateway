<?php

namespace App\Batches\Classes\Class\Move;


use Exception;
use App\Models\Classes;
use App\Models\Attendance;
use App\Models\TraineeClass;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class SwitchClass
{
    use SendNotification;

    public function __construct(?Classes $class, Request $request)
    {
        Gate::authorize('switchClass', $class->find($request->class_id));

        $this->current_user = auth()->user();
    }

    public function switchClass(?TraineeClass $trainee_class, Request $request, $trainee_id)
    {
        try
        {
            $batch_is_active = false;

            $is_exists = $trainee_class->where("class_id", $request->class_id)->where("trainee_id", $trainee_id)->exists();

            $request->filled('class_id') && $batch_is_active = Classes::where('id', $request->class_id)->first()->batch->is_active;
            
            if(!$is_exists && $request->filled('old_class') && $batch_is_active)
            {
                $trainee_class->where('class_id', $request->old_class)->where("trainee_id", $trainee_id)->update([
                    "class_id" => $request->class_id
                ]);

                Attendance::where("class_id", $request->old_class)->where("trainee_id", $trainee_id)->update([
                    "class_id" => $request->class_id
                ]);

                $this->notifyUser('has switched a trainee class', $this->current_user, 'switch_class');
                
                return response(['message' => "Class switched successfully."], 200);
            }

            return response(['message' => "Cannot switch class. Class not exists or class id is wrong."], 400);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Class cannot be switched. Please contact the administrator of the website."], 400);
        }
    }
}
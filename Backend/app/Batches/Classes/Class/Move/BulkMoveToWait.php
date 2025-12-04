<?php

namespace App\Batches\Classes\Class\Move;


use Exception;
use Carbon\Carbon;
use App\Models\Classes;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Models\Attendance;
use App\Traits\BulkHelper;
use App\Models\TraineeClass;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class BulkMoveToWait
{
    use GetList, SendNotification;
    
    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('moveToWait', $class->find($class_id));

        $this->list = 'Wait List';

        $this->list_name = 'wait list';

        $this->current_user = auth()->user();
    }

    public function moveToWait(?Classes $class, ?Trainee $trainees, ?TraineeClass $trainee_class, $class_id, Request $request)
    {
        try
        {
            $message = response(['message' => "Trainees is already in ".$this->list_name."."], 400);

            foreach($request->trainees as $trainee_id)
            {
                $batch_is_active = false;

                $trainee = $trainees->where('id', $trainee_id)->first();

                $is_exists = $trainee_class->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();

                $batch_is_active = Classes::where('id', $class_id)->first()->batch->is_active;

                
                if($is_exists && boolval($batch_is_active) && ($trainee->current_list !== $this->List($this->list)->id))
                {
                    $trainee_class->where("class_id", $class_id)->where("trainee_id", $trainee_id)->delete();

                    Attendance::where("class_id", $class_id)->where("trainee_id", $trainee_id)->delete();

                    $trainee->pervious_list = $trainee->current_list;
                    
                    $trainee->current_list = $this->List($this->list)->id;

                    $trainee->moved_date = Carbon::now();
        
                    $trainee->save();

                    $message = response(['message' => "Trainees moved to ".$this->list_name." successfully."], 200);
                }
            }

            $this->notifyUser('has moved trainees from a class to wait list', $this->current_user, 'move_from_class_to_wait');
    
            return $message;
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Trainee be moved to wait list. Please contact the administrator of the website."], 400);
        }
    }
}
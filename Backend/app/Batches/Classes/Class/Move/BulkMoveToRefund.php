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

class BulkMoveToRefund
{
    use GetList, SendNotification;
    
    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('moveToRefund', $class->find($class_id));

        $this->list = 'Refund List';

        $this->list_name = 'refund list';

        $this->current_user = auth()->user();
    }

    public function moveToRefund(?Classes $class, ?Trainee $trainees, ?TraineeClass $trainee_class, $class_id, Request $request)
    {
        try
        {
            $message = response(['message' => "Trainees is already in ".$this->list_name."."], 400);

            foreach($request->trainees as $trainee_id)
            {
                $batch_is_active = false;

                $trainee = $trainees->where('id', $trainee_id)->first();

                $is_exists = $trainee_class->where("class_id", $class_id)->where("trainee_id", $trainee_id)->exists();

                $class_id && $batch_is_active = Classes::where('id', $class_id)->first()->batch->is_active;
                
                if(($trainee->current_list !== $this->List($this->list)->id) && $is_exists && boolval($batch_is_active))
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

            $this->notifyUser('has moved trainees from a class to refund list', $this->current_user, 'move_from_class_to_refund');
    
            return $message;
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Trainee be moved to wait list. Please contact the administrator of the website."], 400);
        }
    }
}
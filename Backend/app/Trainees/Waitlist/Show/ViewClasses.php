<?php

namespace App\Trainees\Waitlist\Show;

use Exception;
use App\Models\Batch;
use App\Models\Classes;
use App\Models\Trainee;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use App\Traits\BulkHelper;
use App\Models\TraineeClass;
use App\Traits\GetClassMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;

class ViewClasses
{
    use GetClassMeta, GetUser, GetBranch, CheckPermissionByBranch, BulkHelper;
    
    public function __construct(?Trainee $trainee, Request $request)
    {
        // Gate::authorize('assignClass', $trainee->find($request->trainee_id));

        $this->permission = 'assignClass';
                
        $this->current_user = auth()->user();

        $this->permission_collection = 'waitlist';

        $this->permission_keys = ['assignClass'];

        $this->current_permission = 'assignClass_by_branch';

        $this->trainees = $request->filled('trainee_id') ? [$request->trainee_id] : $request->trainees;
    }

    public function viewClasses(?Trainee $trainee, ?Classes $class, ?Batch $batch, Request $request)
    {
        $this->Authorized($trainee, $this->trainees, $this);

        try
        {
            foreach($this->trainees as $trainee_id)
            {
                $trainee = Trainee::where('id', $trainee_id)->first();
    
                $branch_id = $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : $trainee->branch_id;
            }

            $current_batch = $batch->where('branch_id', $branch_id)->where('is_active', true)->first();

            $classes = [];

            $filter_elements = ['class_type', 'level', 'time_slot', 'trainer_id'];

            $classes = $class->where('batch_id', $current_batch?->id);

            $current_classes = $classes;

            foreach($filter_elements as $filter_element)
            {
                $request->filled($filter_element) && $current_classes = $current_classes->where($filter_element, $request->$filter_element);
            }

            $classes = $current_classes->get();

            $classes_collection = [];

            foreach((object) $classes as $key => $t_class)
            {
                $classes_collection[$key] = [
                    'id' => $t_class?->id,
                    'trainer' => $this->User($t_class->user_id)->first()?->full_name,
                    'class_name' => $t_class?->class_name,
                    'class_type' => $t_class?->class_type,
                    'gate' => $this?->meta($t_class->gate)?->first()?->meta_value,
                    'time_slot' => $this?->meta($t_class->time_slot)->first()?->meta_value,
                    'level' => $this?->meta($t_class->level)->first()?->meta_value,
                    'num_of_trainees' => TraineeClass::where('class_id', $t_class->id)->count(),
                ];
            }

            
            return response($classes_collection, 200);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Classes cannot be viewed. Please contact the administrator of the website."], 400);
        }   
    }
}
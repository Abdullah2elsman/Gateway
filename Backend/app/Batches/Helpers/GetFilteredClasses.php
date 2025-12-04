<?php

namespace App\Batches\Helpers;

use Carbon\Carbon;
use App\Models\TraineeClass;

trait GetFilteredClasses
{
    protected function getCollection($class, $batch, $request, $batch_id, $by_branch, $this_class)
    {
            $current_batch = $batch->where('id', $batch_id)->first();

            $classes = [];

            $filter_elements = ['branch','class_type', 'level', 'time_slot', 'gate', 'trainer_id'];

            $classes = $class->where('batch_id', $current_batch?->id);

            $current_classes = $classes;

            $current_user = auth()->user();

            $by_branch && $current_classes = $current_classes->where('branch_id', $current_user?->branch_id);

            foreach($filter_elements as $filter_element)
            {
                if($filter_element === 'branch')
                {
                    ($request->filled($filter_element) && $by_branch === false) && $current_classes = $current_classes->where('branch_id', $this_class->getBranchID($request));
                }
                else 
                {
                    $request->filled($filter_element) && $current_classes = $current_classes->where($filter_element, $request->$filter_element);
                }
            }

            $classes = $current_classes->get();

            $classes_collection = [];

            foreach((object) $classes as $key => $t_class)
            {
                $classes_collection[$key] = [
                    'id' => $t_class?->id,
                    'branch' => $this_class->Branch($t_class->branch_id)->first()->district,
                    'trainer' => $this_class->User($t_class?->trainer_id)?->full_name,
                    'class_name' => $t_class?->class_name,
                    'class_type' => $t_class?->class_type,
                    'gate' => $this_class?->meta($t_class->gate)?->first()?->meta_value,
                    "gate_url" => $t_class?->gate_url,
                    "gate_password" => $t_class?->gate_password,
                    'time_slot' => $this_class->meta($t_class->time_slot)->first()?->meta_value,
                    'level' => $this_class->meta($t_class->level)->first()?->meta_value,
                    'num_of_trainees' => TraineeClass::where('class_id', $t_class->id)->count(),
                    'num_of_confirmation' => TraineeClass::where('class_id', $t_class->id)->where('confirmation', true)->count()
                ];
            }

            $collection = [
                'id' => $current_batch->id,
                'branch' => $this_class->Branch($current_batch->branch_id)->first()->district,
                'batch_title' => $current_batch->batch_title,
                'start_date' => Carbon::parse($current_batch->start_date)->format('d-m-Y'),
                'end_date' => Carbon::parse($current_batch->end_date)->format('d-m-Y'),
                'status' => boolval($current_batch->is_active),
                'num_classes' => count($current_batch->classes),
                'classes' => $classes_collection
            ];

            return $collection;
    }
}
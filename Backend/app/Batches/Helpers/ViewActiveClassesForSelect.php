<?php

namespace App\Batches\Helpers;

use App\Models\Batch;

trait ViewActiveClassesForSelect
{
    protected function viewClasses($classes, $batch_id, $class)
    {
        $classes_data = [];

        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'switch_class') && $classes_data = $class->getCollection($classes->where('batch_id', $batch_id)->get(), $class);
        
        $num_classes = Batch::where('id', $batch_id)?->first()->classes->count();

        $sub_message = $num_classes === 0 ?  response(['message' => "There's no classes available."], 200) : response(['message' => 'Unauthorized'], 401);

        $message = count($classes_data) === 0 ? $sub_message : response($classes_data, 200);

        return $message;
    }
}
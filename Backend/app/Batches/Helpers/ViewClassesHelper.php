<?php

namespace App\Batches\Helpers;

use App\Models\Batch;

trait ViewClassesHelper
{
    protected function viewClasses($classes, $batch_id, $class)
    {
        $classes_data = [];

        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_classes') && $classes_data = $class?->getCollection($classes?->where('batch_id', $batch_id)?->get(), $class);

        ($class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_own_classes') && count($classes_data) === 0) &&

        $classes_data = $class?->getCollection($classes->where('batch_id', $batch_id)?->where('user_id', $class?->current_user?->id)?->get(), $class);

        $num_classes = Batch::where('id', $batch_id)->first()?->classes?->count();

        $sub_message = $num_classes === 0 ?  response(['message' => "There's no classes available."], 200) : response(['message' => 'Unauthorized'], 401);

        $message = count($classes_data) === 0 ? $sub_message : response($classes_data, 200);

        return $message;
    }
}
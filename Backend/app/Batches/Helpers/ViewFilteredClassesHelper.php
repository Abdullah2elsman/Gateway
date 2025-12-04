<?php

namespace App\Batches\Helpers;

trait ViewFilteredClassesHelper
{
    protected function viewClasses($classes, $batch, $request, $batch_id, $class)
    {
        $classes_data = [];

        $by_branch = false;

        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_classes') && $classes_data = $class?->getCollection($classes, $batch, $request, $batch_id, $by_branch, $class);

        ($class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_own_classes') && count($classes_data) === 0) &&

        $classes_data = $class?->getCollection($classes, $batch, $request, $batch_id, $by_branch, $class);

        if($class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys))
        {
            $by_branch = true;

            $classes_data = $class?->getCollection($classes, $batch, $request, $batch_id, $by_branch, $class);
        }
        
        $num_classes = count($class?->getCollection($classes, $batch, $request, $batch_id, $by_branch, $class));

        $sub_message = $num_classes === 0 ?  response(['message' => "There's no classes available."], 200) : response(['message' => 'Unauthorized'], 401);

        $message = count($classes_data) === 0 ? $sub_message : response($classes_data, 200);

        return $message;
    }
}
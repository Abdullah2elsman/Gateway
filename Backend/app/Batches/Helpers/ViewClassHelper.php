<?php

namespace App\Batches\Helpers;

use App\Models\TraineeClass;

trait ViewClassHelper
{
    protected function viewClass($classes, $trainee, $batch_id, $class_id, $class)
    {
        $classes_data = [];

        $current_class =  $this->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) ? $classes?->where('batch_id', $batch_id)->where('id', $class_id)?->where('branch_id', $class->current_user->branch_id)?->first() : $classes->where('batch_id', $batch_id)->where('id', $class_id)->first();
        
        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_classes') && $classes_data = $class->getCollection($current_class, $trainee, $class);

        ($class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_own_classes') && $current_class?->user_id === $class->current_user->id) &&
        
        $classes_data = $class->getCollection($current_class, $trainee, $class);

        ($class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_classes_by_branch') && count($classes_data) === 0) &&
        
        $classes_data = $class->getCollection($current_class, $trainee, $class);

        $num_classes = TraineeClass::where('class_id', $current_class)->count();

        $sub_message = $num_classes === 0 ?  response(['message' => "Class is not available or empty."], 200) : response(['message' => 'Unauthorized'], 401);
        
        $message =  count($classes_data) === 0 ? $sub_message : response($classes_data, 200);

        return $message;
    }
}
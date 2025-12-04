<?php

namespace App\Batches\Helpers;

trait ViewBatchesHelper
{
    protected function viewBatches($batches, $request, $class)
    {
        $batches_data = [];

        $class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_batches') && $batches_data = ($request->filled('branch') ? $class?->getCollection($batches?->where('branch_id', $class->getBranchID($request))?->get(), $class) : $class?->getCollection($batches?->get(), $class));

        ($class->CheckPermissionStatus($class->current_user, $class->permission_collection, 'view_own_batches') && count($batches_data) === 0) &&

        $batches_data = ($request->filled('branch') ? $class?->getCollection($batches?->where('branch_id', $class->getBranchID($request))?->where('user_id', $class->current_user->id)?->get(), $class)
        :
        $class?->getCollection($batches->where('user_id', $class->current_user->id)->get(), $class));

        $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys)
        &&
        $batches_data = $class->getCollection($batches?->where('branch_id', $class->current_user->branch_id)?->get(), $class);

        $num_batches = count($batches_data);

        $sub_message = $num_batches === 0 ?  response(['message' => "There's no batches available."], 200) : response(['message' => 'Unauthorized'], 401);

        $message = count($batches_data) === 0 ? $sub_message : response($batches_data, 200);

        return $message;
    }
}
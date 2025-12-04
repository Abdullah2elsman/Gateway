<?php

namespace App\Users\Helpers;


trait GetSingleUserMetaData
{
    protected function getCollection($class)
    {
            $phone_index = 0;

            $roles_collection = [];

            $status_collection = [];

            $phone_collection = [];

            $meta_collection = [];

            // $branch_collection = $class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) ? [] : ['branch' => $class->current_user->branch->district];

            $user_collection = ['branch' => $class->current_user->branch->district, 'full_name' => $class->current_user->full_name, 'email' => $class->current_user->email];

            foreach($class->current_user->user_meta as $meta)
            {
                $meta_collection[$meta->meta_key] = $meta->meta_value;
            }

            $class->isAllowed($class->current_user, 'view_self_role', $class->permission_collection, $class->current_user?->id) && $roles_collection = ['role' => $class->current_user->role->role];

            $class->isAllowed($class->current_user, 'view_self_status', $class->permission_collection, $class->current_user?->id) && $status_collection = ['status' => boolval($class->current_user->is_activated)];

            $collection = [...$user_collection, ...$roles_collection, ...$status_collection, ...$meta_collection, 'created_at' => $class->current_user->created_at, 'updated_at' => $class->current_user->updated_at];

        return $collection;
    }
}
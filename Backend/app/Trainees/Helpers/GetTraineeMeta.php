<?php

namespace App\Trainees\Helpers;

use Carbon\Carbon;

trait GetTraineeMeta
{
    protected function getCollection($trainees, $class)
    {
        // Pre-load all GeneralMeta to avoid N+1 queries
        $metaIds = [];
        foreach ($trainees as $trainee) {
            if ($trainee->payment_type) $metaIds[] = $trainee->payment_type;
            if ($trainee->preferable_time) $metaIds[] = $trainee->preferable_time;
            if ($trainee->sec_preferable_time) $metaIds[] = $trainee->sec_preferable_time;
            if ($trainee->level) $metaIds[] = $trainee->level;
        }

        // Load GeneralMeta
        $generalMetaCache = [];
        if (!empty($metaIds)) {
            $uniqueIds = array_unique($metaIds);

            $metas = \App\Models\GeneralMeta::whereIn('id', $uniqueIds)->get();
            foreach ($metas as $meta) {
                $generalMetaCache[$meta->id] = $meta->meta_value;
            }
        }

        $collection = [];
        $collection_index = 0;

        foreach ($trainees as $trainee) {
            if ($trainee?->list?->list_title !== $class?->list) {
                continue;
            }

            $trainee_collection = [];
            foreach ($class->keys as $col_key) {
                $trainee_collection[$col_key] = $trainee->$col_key;
            }

            // Use cached GeneralMeta instead of querying
            $sub_collection = [
                'branch' => $trainee?->branch?->district,
                'payment_type' => $generalMetaCache[$trainee->payment_type] ?? null,
                'preferable_time' => $generalMetaCache[$trainee->preferable_time] ?? null,
                'sec_preferable_time' => $generalMetaCache[$trainee->sec_preferable_time] ?? null,
            ];

            // Convert trainee_meta collection to array
            $meta_collection = [];
            foreach ($trainee->trainee_meta as $meta) {
                $meta_collection[$meta->meta_key] = $meta->meta_value;
            }

            // Use eager-loaded relationships instead of querying
            $trainer_collection = [];
            if (
                $class->isAllowed($class->current_user, 'view_trainers', $class->permission_collection, $trainee?->user_id) ||
                $class->isAllowed($class->current_user, 'view_own_trainers', $class->permission_collection, $trainee?->user_id)
            ) {
                $trainer_collection = ['trainer' => $trainee->user?->full_name];
            }

            $level_collection = [];
            if (
                $class->isAllowed($class->current_user, 'view_levels', $class->permission_collection, $trainee?->user_id) ||
                $class->isAllowed($class->current_user, 'view_own_levels', $class->permission_collection, $trainee?->user_id)
            ) {
                $level_collection = ['level' => $generalMetaCache[$trainee->level] ?? null];
            }

            $follow_up_collection = [];
            if (
                $class->isAllowed($class->current_user, 'view_follow_up', $class->permission_collection, $trainee?->user_id) ||
                $class->isAllowed($class->current_user, 'view_own_follow_up', $class->permission_collection, $trainee?->user_id)
            ) {
                $follow_up_collection = ['follow_up' => $trainee->follow_up_user?->full_name];
            }

            $collection[$collection_index++] = [
                ...$trainee_collection,
                ...$sub_collection,
                ...$trainer_collection,
                ...$level_collection,
                ...$follow_up_collection,
                ...$meta_collection,
                'test_date' => $trainee->test_date ? Carbon::parse($trainee->test_date)->format("m/d/Y g:i A") : null,
                'moved_date' => $trainee->moved_date ? Carbon::parse($trainee->moved_date)->format("m/d/Y") : null,
                'created_at' => $trainee->created_at,
                'updated_at' => $trainee->updated_at
            ];
        }

        return $collection;
    }
}

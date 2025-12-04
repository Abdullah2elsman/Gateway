<?php

namespace App\Traits;

use App\Models\GtList;
use Illuminate\Support\Facades\Cache;

trait GetListById
{
    /**
     * Get list by ID with caching
     */
    protected function List($id)
    {
        if (!$id) {
            return null;
        }

        $cacheKey = "gt_list_{$id}";
        
        return Cache::remember($cacheKey, 3600, function () use ($id) {
            return GtList::where('id', $id)->first();
        });
    }
}
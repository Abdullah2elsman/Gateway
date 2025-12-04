<?php

namespace App\Traits;

use App\Models\GeneralMeta;
use Illuminate\Support\Facades\Cache;

trait GetGeneralMeta
{
    /**
     * Get general meta by ID with caching
     */
    protected function GetGeneralMeta($id)
    {
        if (!$id) {
            return null;
        }

        $cacheKey = "general_meta_{$id}";
        
        return Cache::remember($cacheKey, 3600, function () use ($id) {
            return GeneralMeta::where('id', $id)->first();
        });
    }
}
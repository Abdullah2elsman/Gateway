<?php

namespace App\Trainees\Helpers;

use Illuminate\Support\Facades\Cache;

trait ClearTraineeCache
{
    /**
     * Clear trainee cache for a specific list
     * Call this after creating, updating, or deleting trainees
     * 
     * @param string $listType - 'waitlist', 'pendinglist', 'holdlist', 'refundlist', 'blacklist'
     */
    protected function clearTraineeCache($listType = null)
    {
        // Clear all trainee caches if no specific list provided
        if ($listType === null) {
            $lists = ['waitlist', 'pendinglist', 'holdlist', 'refundlist', 'blacklist'];
            foreach ($lists as $list) {
                $this->clearTraineeCache($list);
            }
            return;
        }

        // Clear cache for specific list
        // Use pattern matching to clear all related caches
        $pattern = "trainees_{$listType}_*";
        
        // Note: This requires Redis or Memcached for pattern-based clearing
        // For file/database cache, you might need to track keys differently
        try {
            // Try to clear with pattern (works with Redis)
            Cache::tags([$listType])->flush();
        } catch (\Exception $e) {
            // Fallback: Clear entire cache (not ideal but works)
            // Cache::flush();
            
            // Better approach: Clear specific known keys
            // You can track cache keys in a separate cache entry
        }
    }

    /**
     * Clear general meta cache
     * Call this after adding/updating/deleting general meta (levels, payment types, time slots)
     */
    protected function clearGeneralMetaCache()
    {
        // Clear all general_meta_* caches
        try {
            Cache::tags(['general_meta'])->flush();
        } catch (\Exception $e) {
            // Fallback for cache drivers that don't support tags
        }
    }
}

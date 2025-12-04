<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait ClearTraineeCache
{
    /**
     * Clear all cache related to a specific trainee
     */
    protected function clearTraineeCache($traineeId)
    {
        // Clear single trainee cache
        Cache::forget("trainee_single_{$traineeId}_*");
        
        // Clear trainee class cache
        Cache::forget("trainee_class_{$traineeId}");
        
        // Clear batch trainee classes cache (pattern matching)
        $pattern = "trainee_classes_batch_*";
        // Note: Laravel cache doesn't support wildcard deletion by default
        // You may need to use Redis tags or implement custom cache clearing
        
        // Clear all trainees list cache (since data changed)
        $this->clearAllTraineesListCache();
    }

    /**
     * Clear all trainees list cache
     * This should be called when any trainee is created, updated, or deleted
     */
    protected function clearAllTraineesListCache()
    {
        // Clear pattern: trainees_page_*
        // Note: For production, consider using cache tags with Redis
        // Cache::tags(['trainees'])->flush();
        
        // For now, we'll need to clear specific patterns
        // This is a limitation - consider using Redis with tags for better cache management
    }

    /**
     * Clear cache for specific user's trainee lists
     */
    protected function clearUserTraineesCache($userId)
    {
        $pattern = "trainees_page_*_user_{$userId}_*";
        // Implementation depends on cache driver
        // For Redis: use SCAN command or cache tags
    }

    /**
     * Clear general cache that affects all trainees
     */
    protected function clearGeneralTraineeCache()
    {
        Cache::forget('all_gt_lists');
        Cache::forget('all_general_meta');
    }
}


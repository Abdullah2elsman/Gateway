<?php

namespace App\Batches\Classes\Delete;

use Exception;
use App\Models\Classes;
use App\Models\ClassMeta;

class DeleteLevel
{
    protected $collection_key;

    public function __construct(?Classes $class = null)
    {
        // No authorization required for deleting levels
        $this->collection_key = 'levels';
    }

    public function delete(?ClassMeta $level, $id)
    {
        try {
            // Create ClassMeta instance if null
            if (!$level) {
                $level = new ClassMeta();
            }

            $levelToDelete = $level->where('id', $id)->where('meta_key', $this->collection_key)->first();

            if (!$levelToDelete) {
                return response(['message' => 'Level not found'], 404);
            }

            // Delete the level meta entry
            $levelToDelete->delete();

            // Level deleted successfully - no need to update classes table
            return response([
                'message' => 'Level deleted successfully'
            ], 200);
        } catch (Exception $e) {
            // Log the actual error for debugging
            \Log::error('Level deletion error: ' . $e->getMessage());

            return response([
                'message' => 'Level deletion error: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

<?php

namespace App\Batches\Classes\Delete;

use Exception;
use App\Models\Classes;
use App\Models\ClassMeta;

class DeleteGate
{
    protected $collection_key;

    public function __construct(?Classes $class = null)
    {
        // No authorization required for deleting gates
        $this->collection_key = 'gates';
    }

    public function delete(?ClassMeta $gate, $id)
    {
        try {
            // Create ClassMeta instance if null
            if (!$gate) {
                $gate = new ClassMeta();
            }

            $gateToDelete = $gate->where('id', $id)->where('meta_key', $this->collection_key)->first();

            if (!$gateToDelete) {
                return response(['message' => 'Gate not found'], 404);
            }

            // Delete the gate meta entry
            $gateToDelete->delete();

            // Gate deleted successfully - no need to update classes table
            return response([
                'message' => 'Gate deleted successfully'
            ], 200);
        } catch (Exception $e) {
            // Log the actual error for debugging
            \Log::error('Gate deletion error: ' . $e->getMessage());

            return response([
                'message' => 'Gate deletion error: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

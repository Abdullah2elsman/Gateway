<?php

namespace App\Batches\Classes\Delete;

use Exception;
use App\Models\Classes;
use App\Models\ClassMeta;

class DeleteTimeSlot
{
    protected $collection_key;

    public function __construct(?Classes $class = null)
    {
        // No authorization required for deleting time slots
        $this->collection_key = [];
        $this->collection_key['Online'] = 'time_slots_online';
        $this->collection_key['Offline'] = 'time_slots_offline';
        $this->collection_key['Hybrid'] = 'time_slots_hybrid';
        $this->collection_key['Private'] = 'time_slots_private';
    }

    public function delete(?ClassMeta $timeSlot, $id)
    {
        try {
            // Create ClassMeta instance if null
            if (!$timeSlot) {
                $timeSlot = new ClassMeta();
            }

            // Find the time slot by ID (it could be any of the 4 types)
            $timeSlotToDelete = $timeSlot->where('id', $id)
                ->whereIn('meta_key', [
                    'time_slots_online',
                    'time_slots_offline',
                    'time_slots_hybrid',
                    'time_slots_private'
                ])
                ->first();

            if (!$timeSlotToDelete) {
                return response(['message' => 'Time slot not found'], 404);
            }

            // Delete the time slot meta entry
            $timeSlotToDelete->delete();

            // Time slot deleted successfully - no need to update classes table
            return response([
                'message' => 'Time slot deleted successfully'
            ], 200);
        } catch (Exception $e) {
            // Log the actual error for debugging
            \Log::error('Time slot deletion error: ' . $e->getMessage());

            return response([
                'message' => 'Time slot deletion error: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

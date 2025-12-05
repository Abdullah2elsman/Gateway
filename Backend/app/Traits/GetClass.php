<?php

namespace App\Traits;

use App\Models\Classes;
use App\Models\TraineeClass;

trait GetClass
{
    /**
     * Get the latest class for a trainee
     * Optimized to use a single query instead of loading all classes
     */
    protected function getClass($trainee_id)
    {
        if (!$trainee_id) {
            return null;
        }

        // Get the latest trainee_class with the highest batch position
        // Join with classes and batches to get position in single query
        $traineeClass = TraineeClass::where('gt_trainee_classes.trainee_id', $trainee_id)
            ->join('gt_classes', 'gt_trainee_classes.class_id', '=', 'gt_classes.id')
            ->join('gt_batches', 'gt_classes.batch_id', '=', 'gt_batches.id')
            ->select('gt_classes.id', 'gt_classes.class_name', 'gt_classes.batch_id', 'gt_batches.position')
            ->orderBy('gt_batches.position', 'desc')
            ->first();

        if ($traineeClass) {
            // Return as object similar to Classes model
            return (object) [
                'id' => $traineeClass->id,
                'class_name' => $traineeClass->class_name,
                'batch_id' => $traineeClass->batch_id,
            ];
        }

        return null;
    }
}

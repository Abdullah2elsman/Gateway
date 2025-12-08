<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Trainee;

class GeneralMetaController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    /**
     * Update meta_value based on trainee_id and meta_key in gt_trainee_metas
     */
    public function updatePaidValue(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'trainee_id' => 'required|integer|exists:gt_trainees,id',
                'meta_key' => 'required|string',
                'meta_value' => 'required|string',
            ]);
            
            // Find the meta record by trainee_id and meta_key
            $meta = TraineeMeta::where('trainee_id', $request->trainee_id)
            ->where('meta_key', "paid_value")
            ->first();
            
            // $request->meta_key = "paid_value";
            // Update the meta_value
            $meta->meta_value = $request->meta_value;
            $meta->save();

            return response([
                'message' => 'Meta value updated successfully.',
                'data' => [
                    'id' => $meta->id,
                    'trainee_id' => $meta->trainee_id,
                    'meta_key' => $meta->meta_key,
                    'meta_value' => $meta->meta_value,
                ]
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response([
                'message' => 'Something went wrong. Please contact the administrator.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Update trainee level - creates level if doesn't exist, then assigns to trainee
     */
    public function updateTraineeLevel(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'trainee_id' => 'required|integer|exists:gt_trainees,id',
                'level_name' => 'required|string',
            ]);

            // Find the trainee
            $trainee = Trainee::find($request->trainee_id);

            if (!$trainee) {
                return response([
                    'message' => 'Trainee not found.'
                ], 404);
            }

            // Check if level exists in gt_generalmeta
            $level = \App\Models\GeneralMeta::where('meta_key', 'waitlist_levels')
                ->where('meta_value', $request->level_name)
                ->first();
            $isCreated = false;
            // If level doesn't exist, create it
            if (!$level) {
                $level = \App\Models\GeneralMeta::create([
                    'meta_key' => 'waitlist_levels',
                    'meta_value' => $request->level_name,
                ]);
                $isCreated = true;
            }

            // Update trainee's level with the level ID
            $trainee->level = $level->id;
            $trainee->save();

            return response([
                'message' => 'Trainee level updated successfully.',
                'data' => [
                    'trainee_id' => $trainee->id,
                    'trainee_name' => $trainee->full_name,
                    'level_id' => $level->id,
                    'level_name' => $level->meta_value,
                    'level_created' => $isCreated, // Indicates if level was newly created
                ]
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response([
                'message' => 'Something went wrong. Please contact the administrator.',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

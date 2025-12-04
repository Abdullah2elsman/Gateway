<?php

namespace App\Trainees\Waitlist\Deletes;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use App\Traits\ClearTraineeCache;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\CheckPermission;

class DeleteLevel
{
    use ClearTraineeCache, CheckPermission;

    protected $current_user;
    protected $list_name = 'waitlist_levels';

    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function deleteLevel($id)
    {
        try {
            // Authorization check - ensure user has permission to manage waitlist levels
            $permissions = ['create_trainees', 'update_trainees', 'update_own_trainees', 'create_trainees_by_branch', 'update_trainees_by_branch'];
            if (!$this->CheckPermission($this->current_user, $permissions, 'waitlist')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to perform this action'
                ], 403);
            }

            // Start database transaction
            DB::beginTransaction();

            // Find the level by ID and meta_key
            $gLevel = GeneralMeta::where('id', $id)
                                ->where('meta_key', $this->list_name)
                                ->first();

            if (!$gLevel) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Level not found'
                ], 404);
            }

            // Check if any trainees are currently assigned to this level
            $traineeCount = Trainee::where('level', $id)->count();

            // Update trainees to remove this level assignment
            $affected = 0;
            if ($traineeCount > 0) {
                $affected = Trainee::where('level', $id)->update(['level' => null]);
            }

            // Delete the level meta entry
            $gLevel->delete();

            // Clear caches related to general meta and trainees lists
            $this->clearGeneralTraineeCache();

            // Commit the transaction
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Level deleted successfully',
                'affected_trainees' => $affected,
                'level_name' => $gLevel->meta_value ?? 'Unknown'
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error deleting level: ' . $e->getMessage(), [
                'level_id' => $id,
                'user_id' => $this->current_user->id ?? null
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Level cannot be deleted. Please contact the administrator.'
            ], 500);
        }
    }
}
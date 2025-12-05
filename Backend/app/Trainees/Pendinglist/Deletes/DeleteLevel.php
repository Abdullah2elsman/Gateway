<?php

namespace App\Trainees\Pendinglist\Deletes;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Support\Facades\Gate;

class DeleteLevel
{

    protected $current_user;
    protected $list_name = 'pendinglist_levels';

    public function __construct(?Trainee $trainee)
    {
        // Reuse existing gate consistent with AddLevel on pending list
        Gate::authorize('addPendingLevel', $trainee);

        $this->current_user = auth()->user();
    }

    public function deleteLevel(?GeneralMeta $level, ?Trainee $trainee, $id)
    {
        try {
            $gLevel = $level->where('id', $id)->where('meta_key', $this->list_name)->first();

            if (!$gLevel) {
                return response(['message' => 'Level not found'], 404);
            }

            // Delete the level meta entry
            $gLevel->delete();

            // Unset level for all trainees who had this level
            $affected = $trainee->where('level', $id)->update(['level' => null]);

            return response([
                'message' => 'Level deleted successfully',
                'affected_trainees' => $affected
            ], 200);
        } catch (Exception $e) {
            return response(['message' => 'Something went wrong. Level cannot be deleted. Please contact the administrator of the website.'], 400);
        }
    }
}

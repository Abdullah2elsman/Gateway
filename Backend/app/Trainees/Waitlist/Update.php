<?php

namespace App\Trainees\Waitlist;

use App\Models\Trainee;
use App\Traits\GetList;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Traits\UpdateMeta;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Traits\GetGeneralMeta;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Traits\PermissionUniqueness;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use App\Trainees\Helpers\TraineeDataHelper;
use App\Trainees\Helpers\UpdateTraineeAddtionalData;
use App\Trainees\Helpers\UpdateTraineeEssentialData;

class Update extends Permissions
{
    use TraineeDataHelper, UpdateTraineeEssentialData, UpdateTraineeAddtionalData, GetBranch, 
    GetList, CreateMeta, UpdateMeta, PermissionUniqueness, CheckPermissionByBranch, GetUser,
    SendNotification, GetGeneralMeta;

    public function __construct(?Trainee $trainee, $current_user, $id)
    {
        Gate::authorize('updateTrainee', $trainee->find($id));

        $this->current_user = $current_user;

        $this->permission_collection = 'waitlist';

        $this->payment_collection = "payment_type";

        $this->level_collection = "waitlist_level";

        $this->meta_keys = ['country', 'age_group', 'test_date', 'preferable_time', 'sec_preferable_time', 'job', 'education', 'email', 'city', 'brith_date', 'paid_value', 'remaining_value'];

        $this->permissions = ['update_all', 'update_own'];

        $this->permission_keys = ['update_trainees'];

        $this->current_permission = 'update_trainees_by_branch';
    }

    public function update(?Trainee $trainee, ?TraineeMeta $TraineeMeta, Request $request, $id)
    {
        try 
        {
            // Validate that the same time slot is not used with a different age group
            if ($request->filled('preferable_time') && $request->filled('age_group')) {
                $conflictingTrainee = Trainee::where('preferable_time', $this->GetGeneralMeta($request->preferable_time)->id)
                    ->where('id', '!=', $id) // Exclude current trainee
                    ->whereHas('trainee_meta', function($query) use ($request) {
                        $query->where('meta_key', 'age_group')
                              ->where('meta_value', '!=', $request->age_group);
                    })
                    ->where('current_list', $trainee->find($id)->current_list)
                    ->first();

                if ($conflictingTrainee) {
                    $conflictingAgeGroup = $conflictingTrainee->trainee_meta()
                        ->where('meta_key', 'age_group')
                        ->first()
                        ->meta_value ?? 'Unknown';
                    
                    return response([
                        'message' => "This time slot is already assigned to a trainee with age group '{$conflictingAgeGroup}'. Please choose a different time slot or age group."
                    ], 422);
                }
            }

            // Validate secondary preferable time as well
            if ($request->filled('sec_preferable_time') && $request->filled('age_group')) {
                $conflictingTrainee = Trainee::where('preferable_time', $this->GetGeneralMeta($request->sec_preferable_time)->id)
                    ->where('id', '!=', $id) // Exclude current trainee
                    ->whereHas('trainee_meta', function($query) use ($request) {
                        $query->where('meta_key', 'age_group')
                              ->where('meta_value', '!=', $request->age_group);
                    })
                    ->where('current_list', $trainee->find($id)->current_list)
                    ->first();

                if ($conflictingTrainee) {
                    $conflictingAgeGroup = $conflictingTrainee->trainee_meta()
                        ->where('meta_key', 'age_group')
                        ->first()
                        ->meta_value ?? 'Unknown';
                    
                    return response([
                        'message' => "The secondary time slot is already assigned to a trainee with age group '{$conflictingAgeGroup}'. Please choose a different time slot or age group."
                    ], 422);
                }
            }

            $this->UpdateTraineeEssentialData($trainee->find($id), $request, $this);

            $this->UpdateTraineeAddtionalData($TraineeMeta, $trainee->find($id)->id, $request, $this);

            $this->notifyUser('has updated a trainee on the wait list', $this->current_user, 'update_trainees_in_waitlist');

            return response(['message' => "Trainee updated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
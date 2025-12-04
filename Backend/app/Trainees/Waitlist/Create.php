<?php

namespace App\Trainees\Waitlist;

use App\Models\Trainee;
use App\Traits\GetList;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Traits\GetGeneralMeta;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Traits\PermissionUniqueness;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use App\Trainees\Helpers\TraineeDataHelper;
use App\Trainees\Helpers\StoreTraineeAddtionalData;
use App\Trainees\Helpers\StoreTraineeEssentialData;
use App\Trainees\Helpers\ClearTraineeCache;

class Create extends permissions
{
    use GetUser, StoreTraineeEssentialData, StoreTraineeAddtionalData, ClearTraineeCache, 
    GetBranch, GetList, CreateMeta, PermissionUniqueness, GetGeneralMeta,
    CheckPermissionByBranch, SendNotification;

    public function __construct(?Trainee $trainee, $current_user)
    {
        Gate::authorize('createTrainee', $trainee);

        $this->current_user = $current_user;

        $this->permission_collection = 'waitlist';

        $this->list = "Wait List";

        $this->payment_collection = "payment_type";

        $this->level_collection = "waitlist_level";

        $this->permission_keys = ['create_trainees'];

        $this->current_permission = 'create_trainees_by_branch';

        //'test_date' made a single column for it

        $this->meta_keys = ['country', 'age_group', 'job', 'education', 'email', 'city', 'brith_date', 'paid_value', 'remaining_value'];
    }

    public function create(?Trainee $trainee, ?TraineeMeta $TraineeMeta, Request $request)
    {
        try
        {
            // Validate that the same time slot is not used with a different age group
            if ($request->filled('preferable_time') && $request->filled('age_group')) {
                $timeMeta = $this->GetGeneralMeta($request->preferable_time);
                if ($timeMeta) {
                    $conflictingTrainee = Trainee::where('preferable_time', $timeMeta->id)
                        ->whereHas('trainee_meta', function($query) use ($request) {
                            $query->where('meta_key', 'age_group')
                                  ->where('meta_value', '!=', $request->age_group);
                        })
                        ->where('current_list', $this->List($this->list)->id)
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
            }

            // Validate secondary preferable time as well
            if ($request->filled('sec_preferable_time') && $request->filled('age_group')) {
                $secTimeMeta = $this->GetGeneralMeta($request->sec_preferable_time);
                if ($secTimeMeta) {
                    $conflictingTrainee = Trainee::where('preferable_time', $secTimeMeta->id)
                        ->whereHas('trainee_meta', function($query) use ($request) {
                            $query->where('meta_key', 'age_group')
                                  ->where('meta_value', '!=', $request->age_group);
                        })
                        ->where('current_list', $this->List($this->list)->id)
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
            }

            $created_trainee = $this->StoreTraineeEssentialData($trainee, $request, $this);

            $this->StoreTraineeAddtionalData($TraineeMeta, $created_trainee->id, $request, $this);

            $this->notifyUser('has created a new trainee on the wait list', $this->current_user, 'create_trainees_in_waitlist');

            // Clear cache after creating trainee
            $this->clearTraineeCache('waitlist');

            return response(['message' => "Trainee created successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}
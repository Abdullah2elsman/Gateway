<?php

namespace App\Trainees\Holdlist;

use App\Models\Trainee;
use App\Traits\GetList;
use App\Traits\GetUser;
use App\Traits\GetBranch;
use App\Traits\CreateMeta;
use App\Traits\UpdateMeta;
use App\Traits\GetGeneralMeta;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
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
    use TraineeDataHelper,
        UpdateTraineeEssentialData, 
        UpdateTraineeAddtionalData, 
        GetBranch, 
        GetList, 
        CreateMeta, 
        UpdateMeta, 
        PermissionUniqueness, 
        GetUser, 
        CheckPermissionByBranch, 
        SendNotification,
        GetGeneralMeta;

    public function __construct(?Trainee $trainee, $current_user, $id)
    {
        Gate::authorize('updateHoldTrainee', $trainee->find($id));

        $this->current_user = $current_user;

        $this->permission_collection = 'holdlist';

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
            $this->UpdateTraineeEssentialData($trainee->find($id), $request, $this);

            $this->UpdateTraineeAddtionalData($TraineeMeta, $trainee->find($id)->id, $request, $this);

            $this->notifyUser('has updated a trainee on the hold list', $this->current_user, 'update_trainees_in_holdlist');

            return response(['message' => "Trainee updated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
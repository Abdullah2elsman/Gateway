<?php

namespace App\TraineesData;

use Exception;
use App\Models\Trainee;
use App\Traits\GetUser;
use App\Traits\GetClass;
use App\Traits\GetListById;
use Illuminate\Http\Request;
use App\Traits\GetBranchByID;
use App\Traits\GetGeneralMeta;
use App\Traits\GetBranchByName;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;

class ViewSingleTrainee
{
    use GetUser, GetBranchByID, GetBranchByName, GetListById, GetClass, GetGeneralMeta, CheckPermissionByBranch;

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainees', $trainee);

        $this->permission_collection = 'pendingusers';

        $this->permission_keys = ['view_trainees'];

        $this->current_permission = 'view_trainees_by_branch';

        $this->current_user = auth()->user();
    }

    public function viewSingleTraineeData(?Trainee $trainee, Request $request, $trainee_id)
    {
        try {
            // Build cache key
            $branchFilter = $request->filled('branch') ? '_branch_' . $this->getBranchID($request) : '';
            $isBranchRestricted = $this->CheckPermissionByBranch(
                $this,
                $this->permission_collection,
                $this->current_permission,
                $this->permission_keys
            );
            // Build query with eager loading
            $query = $trainee->newQuery()
                ->with([
                    'trainee_meta',
                    'user:id,full_name',
                    'branch:id,district',
                    'follow_up_user:id,full_name',
                    'list:id,list_title',
                    'trainee_classes' => function ($q) {
                        $q->with(['classes' => function ($q) {
                            $q->select('id', 'class_name', 'batch_id')
                                ->with(['batch' => function ($q) {
                                    $q->select('id', 'position');
                                }]);
                        }]);
                    }
                ])
                ->where('id', $trainee_id);

            // Apply permission-based filtering
            if ($isBranchRestricted) {
                $query->where('branch_id', $this->current_user->branch_id);
            } elseif ($request->filled('branch')) {
                $query->where('branch_id', $this->getBranchID($request));
            }

            $current_trainee = $query->first();

            if (!$current_trainee) {
                return response(["message" => "This trainee is not found."], 200);
            }

            // Determine status - use eager loaded relationships
            if ($current_trainee->current_list !== null) {
                $status = $current_trainee->list?->list_title ?? $this->List($current_trainee->current_list)?->list_title;
            } else {
                // Get the latest class with highest batch position
                $latestClass = $current_trainee->trainee_classes
                    ->sortByDesc(function ($tc) {
                        return $tc->classes?->batch?->position ?? 0;
                    })
                    ->first();

                $status = $latestClass?->classes?->class_name ?? $this->getClass($current_trainee->id)?->class_name;
            }

            // Follow-up data - use eager loaded relationship
            $follow_up_collection = [];
            if ($status === 'Pending List' && $current_trainee->follow_up) {
                $follow_up_name = $current_trainee->follow_up_user?->full_name ?? $this->User($current_trainee->follow_up)?->full_name;
                if ($follow_up_name) {
                    $follow_up_collection = ['follow_up' => $follow_up_name];
                }
            }

            // Convert trainee_meta to array
            $meta_collection = [];
            foreach ($current_trainee->trainee_meta as $meta) {
                $meta_collection[$meta->meta_key] = $meta->meta_value;
            }

            // Get payment type - use cached method
            $paymentType = null;
            if ($current_trainee->payment_type) {
                $paymentMeta = $this->GetGeneralMeta($current_trainee->payment_type);
                $paymentType = $paymentMeta?->meta_value;
            }

            // Build response
            $trainees_collection = [
                'id' => $current_trainee->id,
                'status' => $status,
                'full_name' => $current_trainee->full_name,
                'attend_type' => $current_trainee->attend_type,
                'test_date' => $current_trainee->test_date,
                'branch' => $current_trainee->branch?->district ?? $this->Branch($current_trainee->branch_id)?->first()?->district,
                'trainer' => $current_trainee->user?->full_name,
                'payment_type' => $paymentType,
                ...$follow_up_collection,
                ...$meta_collection
            ];

            return response($trainees_collection, 200);
        } catch (Exception $e) {
            return response([
                'message' => "Something went wrong. Trainees cannot be viewed. Please contact the administrator of the website.",
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

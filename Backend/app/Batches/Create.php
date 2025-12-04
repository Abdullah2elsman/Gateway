<?php

namespace App\Batches;

use Exception;
use Carbon\Carbon;
use App\Models\Batch;
use App\Traits\GetBranch;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;

class Create extends Permissions
{
    use GetBranch, CheckPermissionByBranch, SendNotification;

    public function __construct(?Batch $batch, $current_user)
    {
        Gate::authorize('createBatches', $batch);
        
        $this->current_user = $current_user;

        $this->permission_collection = 'batches';
        
        $this->permission_keys = ['create_batches', 'create_own_batches'];

        $this->current_permission = 'create_batches_by_branch';
    }

    public function create(?Batch $batch, Request $request)
    {
        try
        {

            $branch_id = $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : ($request->filled('branch') ? $this->Branch($request->branch)->id : $this->current_user->branch_id);

            boolval($request->status) === true && $batch->where('branch_id', $branch_id)->where('is_active', true)->update(['is_active' => false]);

            $current_position = $batch->select('position')->max('position');

            $current_position === NULL && $current_position = 0;
            
            $batch->create(['user_id' => $this->current_user->id, 'branch_id' =>  $branch_id, 'batch_title' => $request->batch_title, 'start_date' => Carbon::parse($request->start_date), 'end_date' => Carbon::parse($request->end_date), 'is_active' => boolval($request->status), 'position' => $current_position + 1]);

            $this->notifyUser('has created a batch', $this->current_user, 'create_batches');
            
            return response(['message' => "Batch created successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}
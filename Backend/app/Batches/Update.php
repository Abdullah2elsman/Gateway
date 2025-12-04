<?php

namespace App\Batches;

use Carbon\Carbon;
use App\Models\Batch;
use App\Traits\GetBranch;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;

class Update extends Permissions
{
    use GetBranch, CheckPermissionByBranch, SendNotification;

    public function __construct(?Batch $batch, $id)
    {
        Gate::authorize('updateBatches', $batch->find($id));

        $this->current_user = auth()->user();

        $this->permission_collection = 'batches';
        
        $this->permission_keys = ['update_batches', 'update_own_batches'];

        $this->current_permission = 'update_batches_by_branch';
    }

    public function update(?Batch $batch, Request $request, $id)
    {
        try
        {
            $current_batch = $batch->where('id', $id)->first();

            $branch_id = $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : ($request->filled('branch') ? $this->Branch($request->branch)->id : $current_batch->branch_id);

            boolval($request->status) === true && $batch->where('branch_id', $branch_id)->where('is_active', true)->update(['is_active' => false]);
            
            $current_batch->find($id)->update(['branch_id' =>  $branch_id, 'batch_title' => $request->batch_title, 'start_date' => Carbon::parse($request->start_date), 'end_date' => Carbon::parse($request->end_date), 'is_active' => boolval($request->status)]);

            $this->notifyUser('has updated a batch', $this->current_user, 'update_batches');
            
            return response(['message' => "Batch updated successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
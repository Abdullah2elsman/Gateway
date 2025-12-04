<?php

namespace App\Batches\Action;

use Exception;
use App\Models\Batch;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\DeleteTraineesOnBatchDelete;

class Delete extends Permissions
{
    use DeleteTraineesOnBatchDelete, SendNotification;

    public function __construct(?Batch $batch, $id)
    {
        Gate::authorize('deleteBatches', $batch->find($id));

        $this->current_user = auth()->user();
    }

    public function delete(?Batch $batch, $id)
    {
        try
        {
            $current_batch = $batch->find($id);

            $this->deleteTrainees($current_batch->classes);

            $current_batch->delete();

            $this->notifyUser('has deleted a batch', $this->current_user, 'delete_batches');
            
            return response(['message' => "Batch deleted successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
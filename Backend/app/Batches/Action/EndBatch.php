<?php

namespace App\Batches\Action;

use App\Models\Batch;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class EndBatch extends Permissions
{
    use SendNotification;

    public function __construct(?Batch $batch, $id)
    {
        Gate::authorize('endBatch', $batch->find($id));

        $this->current_user = auth()->user();
    }

    public function endBatch(?Batch $batch, $id)
    {
        try
        {
            $batch->where('id', $id)->update(['is_active' => false]);

            $this->notifyUser('has ended a batch', $this->current_user, 'end_batches');
                        
            return response(['message' => "Batch ended successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be ended. Please contact the administrator of the website."], 400);
        }
    }
}
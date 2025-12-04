<?php

namespace App\Batches\Classes;

use Exception;
use App\Models\Classes;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\DeleteTraineesOnClassDelete;

class Delete extends Permissions
{
    use DeleteTraineesOnClassDelete, SendNotification;

    public function __construct(?Classes $class, $class_id)
    {
        Gate::authorize('deleteClasses', $class->find($class_id));

        $this->current_user = auth()->user();
    }

    public function delete(?Classes $class, $batch_id, $class_id)
    {
        try
        {
            $current_class = $class->where('batch_id', $batch_id)->where('id', $class_id)->first();

            $this->deleteTrainees($current_class);

            $current_class->delete();

            $this->notifyUser('has deleted a class', $this->current_user, 'delete_classes');
            
            return response(['message' => "Class deleted successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Class cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
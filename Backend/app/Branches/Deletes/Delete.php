<?php

namespace App\Branches\Deletes;

use Exception;
use App\Models\Branch;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete
{
    use SendNotification;

    public function __construct(?Branch $branch)
    {
        Gate::authorize('deleteBranch', $branch);

        $this->current_user = auth()->user();
    }

    public function delete(?Branch $branch, $id)
    {
        try
        {
            $current_branch = $branch->find($id);

            $current_branch->delete();

            $this->notifyUser('has deleted a branch', $this->current_user, 'delete_branch');

            return response(['message' => "Branch deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Branch cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
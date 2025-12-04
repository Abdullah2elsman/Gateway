<?php

namespace App\Branches;

use Exception;
use App\Models\Branch;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Http\Requests\BranchRequest;
use Illuminate\Support\Facades\Gate;

class Update extends Permissions
{
    use SendNotification;

    public function __construct(?Branch $branch)
    {
        Gate::authorize('updateBranch', $branch);

        $this->current_user = auth()->user();
    }

    public function update(?Branch $branch, BranchRequest $request, $id)
    {
        try
        {
            $current_branch = $branch->find($id);

            $current_branch->update(['country' => $request->country, 'city' => $request->city, 'district' => $request->district]);

            $this->notifyUser('has updated a branch', $this->current_user, 'update_branch');

            return response(['message' => "Branch updated successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The branch cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}

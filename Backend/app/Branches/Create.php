<?php

namespace App\Branches;

use Exception;
use App\Models\Branch;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use App\Http\Requests\BranchRequest;
use Illuminate\Support\Facades\Gate;


class Create extends Permissions
{
    use SendNotification;

    public function __construct(?Branch $branch)
    {
        Gate::authorize('createBranch', $branch);

        $this->current_user = auth()->user();
    }

    public function create(?Branch $branch, BranchRequest $request)
    {
        try
        {
            $branch->create(['country' => $request->country, 'city' => $request->city, 'district' => $request->district]);

            $this->notifyUser('has created a branch', $this->current_user, 'create_branch');

            return response(['message' => "Branch created successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The branch cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}
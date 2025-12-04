<?php

namespace App\Branches\Deletes;

use Exception;
use App\Models\Branch;
use App\Traits\BulkHelper;
use App\Traits\SendNotification;
use App\Http\Requests\BulkBranchRequest;

class BulkDelete
{
    use BulkHelper, SendNotification;

    public function __construct()
    {
        $this->permission = 'deleteBranch';

        $this->current_user = auth()->user();
    }

    public function delete(?Branch $branch, BulkBranchRequest $request)
    {
        $this->Authorized($branch, $request->branches, $this);

        try
        {
            foreach($request->branches as $branch_id)
            {
                $current_branch = $branch->find($branch_id);

                $current_branch->delete();
            }

            $this->notifyUser('has deleted branches', $this->current_user, 'delete_branch');

            return response(['message' => "Branches deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The branches cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}

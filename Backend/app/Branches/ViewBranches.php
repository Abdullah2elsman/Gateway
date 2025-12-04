<?php

namespace App\Branches;

use Exception;
use App\Models\Branch;
use App\Traits\GetBranchByID;
use Auth;

class ViewBranches
{
    use GetBranchByID;

    public function view(?Branch $branch)
    {
        try
        {
            $branches = [];

            $current_branch = [];

            foreach($branch->get() as $key => $s_branch)
            {
                $branches[$key] = ['branch' => $s_branch->district];
            }

            Auth::check() && $current_branch = ['current_branch' => $this->Branch(auth()->user()?->branch_id)->first()?->district];

            return response([...$current_branch, 'branches' => $branches], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The branches cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
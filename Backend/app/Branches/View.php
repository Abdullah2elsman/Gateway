<?php

namespace App\Branches;

use App\Models\Branch;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;
use Exception;

class View extends Permissions
{
    public function __construct(?Branch $branch)
    {
        Gate::authorize('createBranch', $branch);
    }

    public function view(?Branch $branch)
    {
        try
        {
            $branches = [];

            foreach($branch->get() as $key => $s_branch)
            {
                $branches[$key] = ['id' => $s_branch->id, 'country' => $s_branch->country, 'city' => $s_branch->city, 'district' => $s_branch->district];
            }

            return response($branches, 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The branches cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Traits;

use App\Models\Branch;

trait GetBranchByName
{
    protected function getBranchID($request)
    {
        return Branch::where('district', $request->branch)->first()->id;
    }
}
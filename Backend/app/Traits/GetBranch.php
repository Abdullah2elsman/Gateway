<?php

namespace App\Traits;

use App\Models\Branch;

trait GetBranch
{
    protected function Branch($branch_district)
    {
        return Branch::where('district', $branch_district)->first();
    }
}
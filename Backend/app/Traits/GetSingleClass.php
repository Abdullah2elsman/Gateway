<?php

namespace App\Traits;

use App\Models\Classes;

trait GetSingleClass
{
    protected function getClass($class_id)
    {
        return Classes::where('id', $class_id)->first();
    }
}
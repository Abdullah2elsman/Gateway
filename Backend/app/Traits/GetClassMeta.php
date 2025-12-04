<?php

namespace App\Traits;

use App\Models\ClassMeta;

trait GetClassMeta
{
    protected function meta($id)
    {
        return ClassMeta::where('id' ,$id);
    }
}
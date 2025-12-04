<?php

namespace App\Traits;

use App\Models\GeneralMeta;

trait GetGeneralMetaByKey
{
    protected function GetGeneralMeta($meta_key)
    {
        return GeneralMeta::where('meta_key', $meta_key)->first();
    }
}
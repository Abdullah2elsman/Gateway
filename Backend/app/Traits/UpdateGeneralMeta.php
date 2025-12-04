<?php

namespace App\Traits;

use App\Models\GeneralMeta;

trait UpdateGeneralMeta
{
    protected function UpdateMeta($meta_key, $meta_value)
    {
        return GeneralMeta::where('meta_key', $meta_key)->update([
            'meta_value' => $meta_value
        ]);
    }
}
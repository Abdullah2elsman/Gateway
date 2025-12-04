<?php

namespace App\Traits;

use App\Models\GeneralMeta;

trait CreateGeneralMeta
{
    protected function CreateMeta($meta_key, $meta_value)
    {
        return GeneralMeta::create([
            'meta_key' => $meta_key,
            'meta_value' => $meta_value
        ]);
    }
}
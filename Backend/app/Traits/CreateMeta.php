<?php

namespace App\Traits;

trait CreateMeta
{
    protected function CreateMeta($model, $id_key, $id, $meta_key, $meta_value)
    {
        return $model->create([
            $id_key => $id,
            'meta_key' => $meta_key,
            'meta_value' => $meta_value
        ]);
    }
}
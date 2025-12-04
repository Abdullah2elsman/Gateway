<?php

namespace App\Traits;

trait UpdateMeta
{
    protected function UpdateMeta($model, $user_id_key, $user_id, $meta_key, $meta_value)
    {
        $meta_model = $model->where($user_id_key, $user_id)->where('meta_key', $meta_key);

        return $meta_model->update([
            'meta_value' => $meta_value
        ]);
    }
}
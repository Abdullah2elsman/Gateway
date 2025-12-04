<?php

namespace App\Batches\Helpers;

trait GetBatchesDataHelper
{
    protected function getData($model, $id)
    {
        return $model->where('id', $id)->first()?->meta_value; 
    }
}
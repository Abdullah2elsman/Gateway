<?php

namespace App\Trainees\Helpers;

trait StoreTraineeAddtionalData
{
    protected function StoreTraineeAddtionalData($TraineeMeta, $trainee_id, $request, $class)
    {
        if($request->has('phone_numbers'))
        {
            foreach($request->phone_numbers as $ph_key => $phone_number)
            {
                    $class->CreateMeta($TraineeMeta, 'trainee_id', $trainee_id, 'phone_number_'.$ph_key, $phone_number);
            }
        }
 
        foreach($class->meta_keys as $meta_key)
        {
            $request->has($meta_key) && $class->CreateMeta($TraineeMeta, 'trainee_id', $trainee_id, $meta_key, $request->$meta_key);
        }
    }
}
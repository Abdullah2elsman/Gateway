<?php

namespace App\Users\Helpers;

trait StoreUserAddtionalData
{
    protected function StoreUserAddtionalData($UserMeta, $user_id, $request, $class)
    {
        $request->has('country') && $class->CreateMeta($UserMeta, 'user_id', $user_id, 'country', $request->country);

        foreach($request->phone_numbers as $key => $phone_number)
        {
            $class->CreateMeta($UserMeta, 'user_id', $user_id, 'phone_number_'.$key, $phone_number);
        }
    }
}
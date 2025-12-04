<?php

namespace App\Users\Helpers;

trait UpdateUserAdditionalData
{
    protected function UpdateUserAdditionalData($UserMeta, $user_id, $request, $class)
    {
        if($request->has('phone_numbers'))
        {
            foreach($request->phone_numbers as $ph_key => $phone_number)
            {
                $UserMeta->where('user_id', $user_id)->where('meta_key', 'phone_number_'.$ph_key)->exists() ?

                    $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'phone_number_'.$ph_key, $phone_number)
                    :
                    $class->CreateMeta($UserMeta, 'user_id', $user_id, 'phone_number_'.$ph_key, $phone_number);
            }
        }
 
        $request->filled('personal_email') && ($UserMeta->where('user_id', $user_id)->where('meta_key', 'personal_email')->exists() ?

                $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'personal_email', $request->personal_email)
                :
                $class->CreateMeta($UserMeta, 'user_id', $user_id, 'personal_email', $request->personal_email));

        $request->filled('country') && ($UserMeta->where('user_id', $user_id)->where('meta_key', 'country')->exists() ?

                $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'country', $request->country)
                :
                $class->CreateMeta($UserMeta, 'user_id', $user_id, 'country', $request->country));

        $request->file('image') && ($UserMeta->where('user_id', $user_id)->where('meta_key', 'user_image')->exists() ?

                $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'user_image', $class->storeImage($request->file('image'), 'user'))
                :
                $class->CreateMeta($UserMeta, 'user_id', $user_id, 'user_image', $class->storeImage($request->file('image'), 'user')));
    }
}
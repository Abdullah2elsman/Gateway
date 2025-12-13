<?php

namespace App\Users\Helpers;

use App\Models\User;
use App\Models\UserMeta;

trait StoreUserAddtionalData
{
    protected function StoreUserAddtionalData($request)
    {
        $lastUserId = User::orderBy('id', 'desc')->first()->id;
        if ($request->filled('country')) {
            $metaData[] = [
                'user_id'    => $lastUserId,
                'meta_key'   => 'country',
                'meta_value' => $request->country,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $i = 0;
        if ($request->has('phone_numbers') && is_array($request->phone_numbers)) {
            foreach ($request->phone_numbers as $number) {
                // Ensure the number is a string and not empty before inserting
                if (is_string($number) && !empty($number)) {
                    $metaData[] = [
                        'user_id'    => $lastUserId,
                        'meta_key'   => 'phone_number_' . $i++,
                        'meta_value' => $number, // Each number gets its own UserMeta row
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        if (!empty($metaData)) {
            // Note: Use the UserMeta model's table name if it's not 'user_meta'
            UserMeta::insert($metaData);
        }

        
    }
}

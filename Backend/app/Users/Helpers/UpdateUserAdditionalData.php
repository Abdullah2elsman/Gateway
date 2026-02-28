<?php

namespace App\Users\Helpers;

use Illuminate\Support\Facades\Log;

trait UpdateUserAdditionalData
{
    protected function UpdateUserAdditionalData($UserMeta, $user_id, $request, $class)
    {
        if ($request->has('phone_numbers')) {
            foreach ($request->phone_numbers as $ph_key => $phone_number) {
                $UserMeta->where('user_id', $user_id)->where('meta_key', 'phone_number_' . $ph_key)->exists() ?

                    $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'phone_number_' . $ph_key, $phone_number)
                    :
                    $class->CreateMeta($UserMeta, 'user_id', $user_id, 'phone_number_' . $ph_key, $phone_number);
            }
        }

        $request->filled('personal_email') && ($UserMeta->where('user_id', $user_id)->where('meta_key', 'personal_email')->exists() ?

            $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'personal_email', $request->personal_email)
            :
            $class->CreateMeta($UserMeta, 'user_id', $user_id, 'personal_email', $request->personal_email));

        $request->filled('country') && ($UserMeta->where('user_id', $user_id)->where('meta_key', 'country')->exists() ?

            $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'country', $request->country)
            :
            $class->CreateMeta($UserMeta, 'user_id', $user_id, 'country', $request->country)
        );

        if ($request->file('image')) {
            Log::info('Processing user image upload', [
                'user_id' => $user_id,
                'has_file' => $request->hasFile('image'),
                'file_info' => [
                    'name' => $request->file('image')->getClientOriginalName(),
                    'size' => $request->file('image')->getSize(),
                    'mime' => $request->file('image')->getMimeType()
                ]
            ]);

            $imagePath = $class->storeImage($request->file('image'), 'user');

            Log::info('Image stored, updating database', [
                'user_id' => $user_id,
                'image_path' => $imagePath,
                'meta_exists' => $UserMeta->where('user_id', $user_id)->where('meta_key', 'user_image')->exists()
            ]);

            if ($UserMeta->where('user_id', $user_id)->where('meta_key', 'user_image')->exists()) {
                $class->UpdateMeta($UserMeta, 'user_id', $user_id, 'user_image', $imagePath);
            } else {
                $class->CreateMeta($UserMeta, 'user_id', $user_id, 'user_image', $imagePath);
            }

            Log::info('User image database update completed', [
                'user_id' => $user_id,
                'image_path' => $imagePath
            ]);
        } else {
            Log::info('No image file in request', [
                'user_id' => $user_id,
                'has_image_key' => $request->has('image'),
                'all_files' => array_keys($request->allFiles())
            ]);
        }
    }
}

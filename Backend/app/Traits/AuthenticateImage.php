<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

trait AuthenticateImage
{
    protected function Authenticated($image, $token)
    {
        $tokens = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

        if (!$tokens) {
            return false;
        }

        $expires_at = Carbon::parse($tokens->expires_at);
        $current_time = Carbon::now();
        $is_expired = $expires_at->isPast() || $expires_at->equalTo($current_time);

        // Check if image exists in the correct storage location
        $image_path = 'user/' . $image;
        $is_image_exists = Storage::exists($image_path);

        // Both token must be valid AND image must exist
        return !$is_expired && $is_image_exists;
    }
}

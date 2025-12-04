<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

trait AuthenticateImage
{
    protected function Authenticated($image, $token)
    {
        $tokens = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
        
        $expires_at = Carbon::parse($tokens->expires_at);

        $current_time = Carbon::now();

        $is_expired = $expires_at->isPast() || $expires_at->equalTo($current_time);

        $is_image_exists = Storage::disk('public')->exists($image);
        
        return !$is_expired || $is_image_exists;
    }
}
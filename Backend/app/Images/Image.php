<?php

namespace App\Images;

use Exception;
use App\Traits\AuthenticateImage;
use Illuminate\Support\Facades\Storage;

class Image
{
    use AuthenticateImage;

    protected $current_user;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;
    }

    public function getImage($image, $token)
    {
        try {
            if (!$this->Authenticated($image, $token)) {
                return response(['message' => "Image not exists or token invalid. Please try again."], 404);
            }

            $path = 'user/' . $image;
            $full_path = storage_path('app/' . $path);

            // Check if file actually exists on filesystem
            if (!file_exists($full_path)) {
                return response(['message' => "Image file not found on server."], 404);
            }

            return response()->file($full_path);
        } catch (Exception $e) {
            return response(['message' => "Something went wrong. The image cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}

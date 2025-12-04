<?php

namespace App\Images;

use Exception;
use App\Traits\AuthenticateImage;
use Illuminate\Support\Facades\Storage;

class PublicImage
{
    use AuthenticateImage;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;
    }

    public function getImage($image)
    {
        try
        {
            $path = '/logo/'.$image;

            return response()->file(
                storage_path('app/'.$path)
            ); 
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The image cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
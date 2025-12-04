<?php

namespace App\Images;

use Exception;
use App\Traits\AuthenticateImage;
use Illuminate\Support\Facades\Storage;

class Image
{
    use AuthenticateImage;

    public function __construct($current_user)
    {
        $this->current_user = $current_user;
    }

    public function getImage($image, $token)
    {
        // try
        // {
            if(!$this->Authenticated($image, $token))
            {
                return response(['message' => "Image not exists. Please try again."], 404);
            }

            $path = '/user/'.$image;

            return response()->file(
                storage_path('app/'.$path)
            ); 
        // }
        // catch (Exception $e)
        // {
        //     return response(['message' => "Something went wrong. The image cannot be viewed. Please contact the administrator of the website."], 400);
        // }
    }
}
<?php

namespace App\Http\Controllers;

use App\Images\Image;
use App\Images\PublicImage;
use Illuminate\Http\Request;

class ImageAccessController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function image($image, $token)
    {
        $this->image['user'] = new Image($this->current_user);

        return $this->image['user']->getImage($image, $token);
    }

    public function publicImage($image)
    {
        $this->image['logo'] = new PublicImage($this->current_user);

        return $this->image['logo']->getImage($image);
    }
}
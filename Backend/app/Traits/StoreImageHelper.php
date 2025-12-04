<?php

namespace App\Traits;

trait StoreImageHelper
{
    protected function storeImage($image, $path)
    {
        $getImage = $image;

        $imageName = time().'_'.rand(0,9000000).'_'.$getImage->getClientOriginalName();

        $getImage->move(storage_path('app/'.$path), $imageName);
        
        return  "/{$path}/{$imageName}";
    }
}
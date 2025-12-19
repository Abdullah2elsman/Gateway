<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ImageAccessController;
use Illuminate\Support\Facades\Artisan;

Route::get('/user/{image}/{token}', [ImageAccessController::class, 'image']);
Route::get('/user/{image}', [ImageAccessController::class, 'publicUserImage']);

Route::get('/logo/{image}', [ImageAccessController::class, 'publicImage']);

// Debug route to test image serving
Route::get('/debug-image/{image}', function ($image) {
    $path = 'user/' . $image;
    $full_path = storage_path('app/' . $path);

    return response()->json([
        'image_name' => $image,
        'storage_path' => $path,
        'full_path' => $full_path,
        'file_exists' => file_exists($full_path),
        'storage_exists' => \Illuminate\Support\Facades\Storage::exists($path),
        'directory_contents' => \Illuminate\Support\Facades\Storage::files('user')
    ]);
});

Route::get('/link', function(){
    Artisan::call('storage:link');
});

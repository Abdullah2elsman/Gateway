<?php

namespace App\Http\Controllers;

use App\Images\Image;
use App\Images\PublicImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageAccessController extends Controller
{
    protected $current_user;
    protected $imageHandlers = [];

    public function __construct()
    {
        $this->current_user = Auth::check() ? Auth::user() : null;
    }

    public function image($image, $token)
    {
        $this->imageHandlers['user'] = new Image($this->current_user);

        return $this->imageHandlers['user']->getImage($image, $token);
    }

    public function publicImage($image)
    {
        $this->imageHandlers['logo'] = new PublicImage($this->current_user);

        return $this->imageHandlers['logo']->getImage($image);
    }

    public function publicUserImage($image)
    {
        try {
            // Clean the image name - remove any leading slashes or 'user/' prefix
            $cleanImage = ltrim($image, '/');
            $cleanImage = str_replace('user/', '', $cleanImage);

            $path = 'user/' . $cleanImage;
            $full_path = storage_path('app/' . $path);

            // Log debug information
            Log::info('Image Request Debug', [
                'original_image' => $image,
                'cleaned_image' => $cleanImage,
                'storage_path' => $path,
                'full_path' => $full_path,
                'file_exists' => file_exists($full_path),
                'storage_exists' => Storage::exists($path),
                'directory_exists' => is_dir(storage_path('app/user')),
                'user_files' => Storage::files('user')
            ]);

            // Check if file exists
            if (!file_exists($full_path)) {
                Log::warning('Image not found', [
                    'original_image' => $image,
                    'cleaned_image' => $cleanImage,
                    'path' => $full_path,
                    'directory_contents' => Storage::files('user')
                ]);

                return response()->json([
                    'error' => 'Image not found',
                    'requested' => $image,
                    'cleaned' => $cleanImage,
                    'path' => $full_path,
                    'file_exists' => false,
                    'directory_contents' => Storage::files('user')
                ], 404);
            }

            // Get mime type
            $mimeType = mime_content_type($full_path);

            return response()->file($full_path, [
                'Content-Type' => $mimeType,
                'Cache-Control' => 'public, max-age=31536000',
            ]);
        } catch (\Exception $e) {
            Log::error('Image serving error', [
                'image' => $image,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error serving image',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

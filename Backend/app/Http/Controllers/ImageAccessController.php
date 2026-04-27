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

            // Try both storage locations: public/user and user
            $publicPath = 'public/user/' . $cleanImage;
            $privatePath = 'user/' . $cleanImage;
            
            $publicFullPath = storage_path('app/' . $publicPath);
            $privateFullPath = storage_path('app/' . $privatePath);

            // Check which file exists
            $filePath = null;
            $fullPath = null;
            
            if (file_exists($publicFullPath)) {
                $filePath = $publicPath;
                $fullPath = $publicFullPath;
            } elseif (file_exists($privateFullPath)) {
                $filePath = $privatePath;
                $fullPath = $privateFullPath;
            }

            // Log debug information
            Log::info('Image Request Debug', [
                'original_image' => $image,
                'cleaned_image' => $cleanImage,
                'public_path' => $publicPath,
                'private_path' => $privatePath,
                'public_exists' => file_exists($publicFullPath),
                'private_exists' => file_exists($privateFullPath),
                'chosen_path' => $filePath,
                'full_path' => $fullPath
            ]);

            // If no file found, return error
            if (!$fullPath) {
                Log::warning('Image not found in any location', [
                    'original_image' => $image,
                    'cleaned_image' => $cleanImage,
                    'public_path' => $publicFullPath,
                    'private_path' => $privateFullPath,
                    'public_files' => Storage::files('public/user'),
                    'private_files' => Storage::files('user')
                ]);

                return response()->json([
                    'error' => 'Image not found',
                    'requested' => $image,
                    'cleaned' => $cleanImage,
                    'searched_paths' => [$publicFullPath, $privateFullPath],
                    'public_files' => Storage::files('public/user'),
                    'private_files' => Storage::files('user')
                ], 404);
            }

            // Get mime type
            $mimeType = mime_content_type($fullPath);

            return response()->file($fullPath, [
                'Content-Type' => $mimeType,
                'Cache-Control' => 'public, max-age=86400', // 24 hours cache
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET',
                'Access-Control-Allow-Headers' => 'Content-Type'
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

    /**
     * Get the public URL for a user image
     * This method returns the direct storage URL that bypasses Laravel authentication
     */
    public function getImageUrl($image)
    {
        try {
            // Clean the image name
            $cleanImage = ltrim($image, '/');
            $cleanImage = str_replace('user/', '', $cleanImage);

            // Check if image exists in public storage
            $publicPath = 'public/user/' . $cleanImage;
            $publicFullPath = storage_path('app/' . $publicPath);
            
            if (file_exists($publicFullPath)) {
                // Return direct storage URL (bypasses Laravel, no token needed)
                $directUrl = env('APP_URL') . '/storage/user/' . $cleanImage;
                
                return response()->json([
                    'success' => true,
                    'image_url' => $directUrl,
                    'filename' => $cleanImage,
                    'type' => 'direct_storage'
                ]);
            }

            // If not in public storage, return Laravel route URL
            $laravelUrl = env('APP_URL') . '/user/' . $cleanImage;
            
            return response()->json([
                'success' => true,
                'image_url' => $laravelUrl,
                'filename' => $cleanImage,
                'type' => 'laravel_route'
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting image URL', [
                'image' => $image,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Error getting image URL',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
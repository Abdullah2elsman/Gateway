<?php

namespace App\Traits;

trait StoreImageHelper
{
    protected function storeImage($image, $path)
    {
        try {
            $getImage = $image;
            $imageName = time() . '_' . rand(0, 9000000) . '_' . $getImage->getClientOriginalName();

            // Use public storage instead of private storage
            $destinationPath = storage_path('app/public/' . $path);

            \Log::info('Image Storage Started (Public)', [
                'original_name' => $getImage->getClientOriginalName(),
                'generated_name' => $imageName,
                'destination_path' => $destinationPath,
                'path_exists' => is_dir($destinationPath),
                'path_writable' => is_writable(dirname($destinationPath)),
                'temp_file' => $getImage->getPathname(),
                'temp_file_exists' => file_exists($getImage->getPathname()),
                'storage_type' => 'public'
            ]);

            // Create directory if it doesn't exist
            if (!is_dir($destinationPath)) {
                \Log::info('Creating public directory', ['path' => $destinationPath]);
                mkdir($destinationPath, 0755, true);
            }

            // Move the image to public storage
            $moveResult = $getImage->move($destinationPath, $imageName);

            $finalPath = $destinationPath . '/' . $imageName;
            // Return only the filename for database storage
            $returnPath = $imageName;

            \Log::info('Image Storage Completed (Public)', [
                'move_result' => $moveResult ? 'success' : 'failed',
                'final_path' => $finalPath,
                'file_exists' => file_exists($finalPath),
                'file_size' => file_exists($finalPath) ? filesize($finalPath) : 0,
                'return_path' => $returnPath,
                'storage_location' => "storage/app/public/{$path}/{$imageName}",
                'public_url' => "storage/{$path}/{$imageName}",
                'accessible_via' => env('APP_URL') . "/storage/{$path}/{$imageName}"
            ]);

            return $returnPath;
        } catch (\Exception $e) {
            \Log::error('Image Storage Failed (Public)', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'image_name' => $image->getClientOriginalName() ?? 'unknown',
                'path' => $path
            ]);
            throw $e;
        }
    }
}

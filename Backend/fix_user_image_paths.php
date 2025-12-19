<?php

/**
 * Script to fix user_image paths in the database
 * 
 * This script updates all user_image meta values to store only the filename
 * instead of the full path (/user/filename.jpg -> filename.jpg)
 * 
 * Run this script once: php fix_user_image_paths.php
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\UserMeta;
use Illuminate\Support\Facades\DB;

echo "Starting user_image path fix...\n\n";

try {
    // Get all user_image meta entries
    $userImages = UserMeta::where('meta_key', 'user_image')->get();

    echo "Found " . $userImages->count() . " user images to process\n\n";

    $updated = 0;
    $skipped = 0;

    foreach ($userImages as $userImage) {
        $oldPath = $userImage->meta_value;

        // Extract just the filename
        // Handles: /user/filename.jpg, user/filename.jpg, or filename.jpg
        $filename = basename($oldPath);

        // Check if update is needed
        if ($oldPath !== $filename) {
            echo "User ID {$userImage->user_id}:\n";
            echo "  Old: {$oldPath}\n";
            echo "  New: {$filename}\n";

            // Verify file exists
            $fullPath = storage_path('app/user/' . $filename);
            if (file_exists($fullPath)) {
                $userImage->meta_value = $filename;
                $userImage->save();
                echo "  ✓ Updated successfully\n\n";
                $updated++;
            } else {
                echo "  ✗ File not found at: {$fullPath}\n\n";
                $skipped++;
            }
        } else {
            echo "User ID {$userImage->user_id}: Already correct ({$filename})\n";
            $skipped++;
        }
    }

    echo "\n========================================\n";
    echo "Fix completed!\n";
    echo "Updated: {$updated}\n";
    echo "Skipped: {$skipped}\n";
    echo "Total: " . $userImages->count() . "\n";
    echo "========================================\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

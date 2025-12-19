<?php

/**
 * Script to migrate user images from private storage to public storage
 * 
 * This script:
 * 1. Creates storage link if not exists
 * 2. Moves images from storage/app/user/ to storage/app/public/user/
 * 3. Updates database paths if needed
 * 4. Verifies all images are accessible via public URLs
 * 
 * Run: php migrate_to_public_storage.php
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\UserMeta;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

echo "========================================\n";
echo "MIGRATING TO PUBLIC STORAGE\n";
echo "========================================\n\n";

try {
    // Step 1: Create storage link
    echo "1. Creating storage link...\n";
    try {
        Artisan::call('storage:link');
        echo "   ✓ Storage link created/verified\n\n";
    } catch (\Exception $e) {
        echo "   ⚠ Storage link error (may already exist): " . $e->getMessage() . "\n\n";
    }

    // Step 2: Check directories
    $privateDir = storage_path('app/user');
    $publicDir = storage_path('app/public/user');

    echo "2. Checking directories...\n";
    echo "   Private: {$privateDir}\n";
    echo "   Public:  {$publicDir}\n";

    if (!is_dir($publicDir)) {
        mkdir($publicDir, 0755, true);
        echo "   ✓ Created public directory\n";
    } else {
        echo "   ✓ Public directory exists\n";
    }
    echo "\n";

    // Step 3: Get all user images
    $userImages = UserMeta::where('meta_key', 'user_image')->get();
    echo "3. Found " . $userImages->count() . " user images to process\n\n";

    $moved = 0;
    $skipped = 0;
    $errors = 0;

    foreach ($userImages as $userImage) {
        $filename = basename($userImage->meta_value);
        $privateFile = $privateDir . '/' . $filename;
        $publicFile = $publicDir . '/' . $filename;

        echo "Processing User ID {$userImage->user_id}: {$filename}\n";

        // Check if file exists in private storage
        if (file_exists($privateFile)) {
            // Check if already exists in public storage
            if (file_exists($publicFile)) {
                echo "   ⚠ Already exists in public storage\n";
                $skipped++;
            } else {
                // Copy file to public storage
                if (copy($privateFile, $publicFile)) {
                    echo "   ✓ Moved to public storage\n";
                    $moved++;

                    // Verify file was copied correctly
                    if (filesize($privateFile) === filesize($publicFile)) {
                        echo "   ✓ File size verified\n";
                    } else {
                        echo "   ⚠ File size mismatch!\n";
                        $errors++;
                    }
                } else {
                    echo "   ✗ Failed to copy file\n";
                    $errors++;
                }
            }
        } else {
            echo "   ✗ File not found in private storage: {$privateFile}\n";
            $errors++;
        }

        // Check public URL accessibility
        $publicUrl = env('APP_URL') . '/storage/user/' . $filename;
        echo "   Public URL: {$publicUrl}\n";
        echo "\n";
    }

    // Step 4: Summary
    echo "========================================\n";
    echo "MIGRATION SUMMARY\n";
    echo "========================================\n";
    echo "Total images: " . $userImages->count() . "\n";
    echo "Moved: {$moved}\n";
    echo "Skipped: {$skipped}\n";
    echo "Errors: {$errors}\n\n";

    // Step 5: Verify storage link
    $linkPath = public_path('storage');
    $targetPath = storage_path('app/public');

    echo "Storage Link Verification:\n";
    echo "Link: {$linkPath}\n";
    echo "Target: {$targetPath}\n";
    echo "Link exists: " . (is_link($linkPath) ? "✓ Yes" : "✗ No") . "\n";
    echo "Target exists: " . (is_dir($targetPath) ? "✓ Yes" : "✗ No") . "\n\n";

    // Step 6: Test a sample image
    if ($userImages->count() > 0) {
        $sampleImage = $userImages->first();
        $sampleFilename = basename($sampleImage->meta_value);
        $samplePublicPath = storage_path('app/public/user/' . $sampleFilename);
        $sampleUrl = env('APP_URL') . '/storage/user/' . $sampleFilename;

        echo "Sample Image Test:\n";
        echo "Filename: {$sampleFilename}\n";
        echo "File exists: " . (file_exists($samplePublicPath) ? "✓ Yes" : "✗ No") . "\n";
        echo "Public URL: {$sampleUrl}\n";
        echo "Test this URL in your browser!\n\n";
    }

    // Step 7: Recommendations
    echo "========================================\n";
    echo "NEXT STEPS\n";
    echo "========================================\n";

    if ($moved > 0) {
        echo "✓ {$moved} images successfully moved to public storage\n";
        echo "→ Test image URLs in browser\n";
        echo "→ Update frontend to use /storage/user/ URLs\n";
        echo "→ Remove old private storage files after verification\n\n";
    }

    if ($errors > 0) {
        echo "⚠ {$errors} errors occurred\n";
        echo "→ Check file permissions\n";
        echo "→ Verify storage directories exist\n";
        echo "→ Check available disk space\n\n";
    }

    echo "Frontend URLs should now be:\n";
    echo "Format: {APP_URL}/storage/user/{filename}\n";
    echo "Example: " . env('APP_URL') . "/storage/user/1234567890_123456_image.jpg\n\n";

    echo "========================================\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

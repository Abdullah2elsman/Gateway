<?php

/**
 * Test script to verify public storage access
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\UserMeta;

echo "========================================\n";
echo "PUBLIC STORAGE ACCESS TEST\n";
echo "========================================\n\n";

// Get the first user image
$userImage = UserMeta::where('meta_key', 'user_image')->first();

if ($userImage) {
    $filename = $userImage->meta_value;
    $publicPath = storage_path('app/public/user/' . $filename);
    $publicUrl = env('APP_URL') . '/storage/user/' . $filename;
    $linkPath = public_path('storage/user/' . $filename);

    echo "Testing Image Access:\n";
    echo "User ID: {$userImage->user_id}\n";
    echo "Filename: {$filename}\n";
    echo "Public Storage Path: {$publicPath}\n";
    echo "Public URL: {$publicUrl}\n";
    echo "Link Path: {$linkPath}\n\n";

    echo "File Checks:\n";
    echo "File exists in storage: " . (file_exists($publicPath) ? "✓ Yes" : "✗ No") . "\n";
    echo "File accessible via link: " . (file_exists($linkPath) ? "✓ Yes" : "✗ No") . "\n";
    echo "File size: " . (file_exists($publicPath) ? filesize($publicPath) . " bytes" : "N/A") . "\n\n";

    echo "Storage Link Check:\n";
    $storageLink = public_path('storage');
    $storageTarget = storage_path('app/public');
    echo "Link: {$storageLink}\n";
    echo "Target: {$storageTarget}\n";
    echo "Link exists: " . (file_exists($storageLink) ? "✓ Yes" : "✗ No") . "\n";
    echo "Target exists: " . (is_dir($storageTarget) ? "✓ Yes" : "✗ No") . "\n\n";

    echo "========================================\n";
    echo "TEST THIS URL IN YOUR BROWSER:\n";
    echo "========================================\n";
    echo $publicUrl . "\n\n";

    if (file_exists($linkPath)) {
        echo "✅ SUCCESS: Image should be accessible via the URL above!\n";
    } else {
        echo "❌ ISSUE: Image not accessible via public link\n";
        echo "Try running: php artisan storage:link\n";
    }
} else {
    echo "No user images found in database.\n";
}

echo "\n========================================\n";

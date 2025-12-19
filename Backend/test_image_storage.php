<?php

/**
 * Test script to check current image storage state
 * 
 * Run: php test_image_storage.php
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\UserMeta;
use Illuminate\Support\Facades\Storage;

echo "========================================\n";
echo "IMAGE STORAGE TEST\n";
echo "========================================\n\n";

// Check storage directories
$privateStoragePath = storage_path('app/user');
$publicStoragePath = storage_path('app/public/user');
$publicLinkPath = public_path('storage');

echo "1. Storage Directory Check:\n";
echo "   Private Path: {$privateStoragePath}\n";
echo "   Private Exists: " . (is_dir($privateStoragePath) ? "✓ Yes" : "✗ No") . "\n";
echo "   Public Path: {$publicStoragePath}\n";
echo "   Public Exists: " . (is_dir($publicStoragePath) ? "✓ Yes" : "✗ No") . "\n";
echo "   Public Writable: " . (is_writable($publicStoragePath) ? "✓ Yes" : "✗ No") . "\n";
echo "   Storage Link: {$publicLinkPath}\n";
echo "   Link Exists: " . (is_link($publicLinkPath) ? "✓ Yes" : "✗ No") . "\n\n";

// List files in both storages
echo "2. Files in Storage:\n";

// Private storage
if (is_dir($privateStoragePath)) {
    $privateFiles = Storage::files('user');
    echo "   Private Storage: " . count($privateFiles) . " files\n";
    foreach (array_slice($privateFiles, 0, 3) as $file) {
        $fullPath = storage_path('app/' . $file);
        $size = file_exists($fullPath) ? filesize($fullPath) : 0;
        echo "     - " . basename($file) . " (" . number_format($size / 1024, 2) . " KB)\n";
    }
    if (count($privateFiles) > 3) {
        echo "     ... and " . (count($privateFiles) - 3) . " more\n";
    }
} else {
    echo "   Private Storage: ✗ Directory not found\n";
}

// Public storage
if (is_dir($publicStoragePath)) {
    $publicFiles = Storage::files('public/user');
    echo "   Public Storage: " . count($publicFiles) . " files\n";
    foreach (array_slice($publicFiles, 0, 3) as $file) {
        $fullPath = storage_path('app/' . $file);
        $size = file_exists($fullPath) ? filesize($fullPath) : 0;
        echo "     - " . basename($file) . " (" . number_format($size / 1024, 2) . " KB)\n";
    }
    if (count($publicFiles) > 3) {
        echo "     ... and " . (count($publicFiles) - 3) . " more\n";
    }
} else {
    echo "   Public Storage: ✗ Directory not found\n";
}
echo "\n";

// Check database records
echo "3. Database Records:\n";
$userImages = UserMeta::where('meta_key', 'user_image')->get();
echo "   Total records: " . $userImages->count() . "\n\n";

if ($userImages->count() > 0) {
    echo "4. Sample Records:\n";
    foreach ($userImages->take(5) as $img) {
        $filename = basename($img->meta_value);
        $privateExists = file_exists(storage_path('app/user/' . $filename));
        $publicExists = file_exists(storage_path('app/public/user/' . $filename));
        $publicUrl = env('APP_URL') . '/storage/user/' . $filename;

        echo "   User ID: {$img->user_id}\n";
        echo "   DB Value: {$img->meta_value}\n";
        echo "   Filename: {$filename}\n";
        echo "   Private Storage: " . ($privateExists ? "✓ Yes" : "✗ No") . "\n";
        echo "   Public Storage: " . ($publicExists ? "✓ Yes" : "✗ No") . "\n";
        echo "   Public URL: {$publicUrl}\n";
        echo "   Format: " . (strpos($img->meta_value, '/') === false ? "✓ New (filename only)" : "⚠ Old (with path)") . "\n";
        echo "\n";
    }
}

// Check for issues
echo "5. Issues Found:\n";
$issues = [];

// Check for old format paths
$oldFormat = UserMeta::where('meta_key', 'user_image')
    ->where('meta_value', 'LIKE', '%/%')
    ->count();
if ($oldFormat > 0) {
    $issues[] = "⚠ {$oldFormat} records using old path format (need migration)";
}

// Check for missing files
$missingFiles = 0;
foreach ($userImages as $img) {
    $filename = basename($img->meta_value);
    $fullPath = storage_path('app/user/' . $filename);
    if (!file_exists($fullPath)) {
        $missingFiles++;
    }
}
if ($missingFiles > 0) {
    $issues[] = "⚠ {$missingFiles} database records point to missing files";
}

if (count($issues) === 0) {
    echo "   ✓ No issues found!\n";
} else {
    foreach ($issues as $issue) {
        echo "   {$issue}\n";
    }
}

echo "\n========================================\n";
echo "RECOMMENDATIONS:\n";
echo "========================================\n";

if ($oldFormat > 0) {
    echo "→ Run: php fix_user_image_paths.php\n";
    echo "  This will update {$oldFormat} records to new format\n\n";
}

if ($missingFiles > 0) {
    echo "→ {$missingFiles} files are missing from storage\n";
    echo "  Check if files were deleted or moved\n\n";
}

if (count($issues) === 0) {
    echo "✓ Everything looks good!\n";
    echo "  You can test image upload and retrieval\n\n";
}

echo "========================================\n";

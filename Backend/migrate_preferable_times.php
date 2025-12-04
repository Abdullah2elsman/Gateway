<?php
/**
 * Migration script to consolidate all preferable times into a single shared list
 * Run this with: php migrate_preferable_times.php
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\GeneralMeta;

echo "Starting migration of preferable times...\n\n";

// Get all old preferable time entries
$oldKeys = [
    'preferable_times_online_adult',
    'preferable_times_online_teen',
    'preferable_times_offline_adult',
    'preferable_times_offline_teen',
    'preferable_times_hybrid_adult',
    'preferable_times_hybrid_teen',
    'preferable_times_private_adult',
    'preferable_times_private_teen',
];

$oldEntries = GeneralMeta::whereIn('meta_key', $oldKeys)->get();

echo "Found " . $oldEntries->count() . " old entries\n";

$newKey = 'preferable_times';
$migratedCount = 0;
$skippedCount = 0;

foreach ($oldEntries as $entry) {
    $value = trim($entry->meta_value);
    
    // Check if this value already exists in the new shared list
    $exists = GeneralMeta::where('meta_key', $newKey)
                        ->whereRaw('LOWER(meta_value) = ?', [strtolower($value)])
                        ->exists();
    
    if (!$exists) {
        // Create in new shared list
        GeneralMeta::create([
            'meta_key' => $newKey,
            'meta_value' => $value,
        ]);
        $migratedCount++;
        echo "✓ Migrated: $value\n";
    } else {
        $skippedCount++;
        echo "- Skipped (duplicate): $value\n";
    }
}

echo "\n=== Migration Complete ===\n";
echo "Migrated: $migratedCount entries\n";
echo "Skipped (duplicates): $skippedCount entries\n";
echo "\nOld entries are still in the database. You can delete them manually if needed.\n";
echo "To delete old entries, run:\n";
echo "php artisan tinker --execute=\"\\App\\Models\\GeneralMeta::whereIn('meta_key', ['preferable_times_online_adult', 'preferable_times_online_teen', 'preferable_times_offline_adult', 'preferable_times_offline_teen', 'preferable_times_hybrid_adult', 'preferable_times_hybrid_teen', 'preferable_times_private_adult', 'preferable_times_private_teen'])->delete();\"\n";

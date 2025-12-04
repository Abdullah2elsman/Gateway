<?php
/**
 * Test script to verify preferable time validation
 * Run this with: php test_validation.php
 */

echo "Testing preferable time validation...\n\n";

// Test cases
$testCases = [
    ['value' => 'Adult', 'should_fail' => true],
    ['value' => 'Teen', 'should_fail' => true],
    ['value' => 'Online', 'should_fail' => true],
    ['value' => 'Offline', 'should_fail' => true],
    ['value' => 'Morning 9-11 AM', 'should_fail' => false],
    ['value' => 'Afternoon 2-4 PM', 'should_fail' => false],
];

$forbidden_values = ['adult', 'teen', 'online', 'offline', 'hybrid', 'private'];

foreach ($testCases as $test) {
    $value = trim($test['value']);
    $is_forbidden = in_array(strtolower($value), $forbidden_values);
    
    $result = $is_forbidden ? '❌ REJECTED' : '✅ ALLOWED';
    $expected = $test['should_fail'] ? '❌ REJECTED' : '✅ ALLOWED';
    $status = ($result === $expected) ? '✓ PASS' : '✗ FAIL';
    
    echo "$status | Testing: '$value' | Result: $result | Expected: $expected\n";
}

echo "\n=== Validation Logic Test Complete ===\n";

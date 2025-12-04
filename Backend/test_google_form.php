<?php

// Test script for Google Form API

$url = 'http://localhost:8000/api/v1/google-form/submit';

$data = [
    'full_name' => 'Test User from PHP',
    'mobile_number' => '+201234567892',
    'age' => '30',
    'education' => 'Bachelor Degree',
    'job' => 'Software Engineer',
    'is_current_trainee' => 'No',
    'when_joined' => '',
    'how_did_you_hear' => 'Social Media, Friend',
    'preferable_time' => 'Morning 9-12'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo "Error sending request\n";
} else {
    echo "Response:\n";
    echo $result . "\n";
    
    $response = json_decode($result, true);
    if ($response['success']) {
        echo "\n✓ SUCCESS! Trainee ID: " . $response['trainee_id'] . "\n";
    } else {
        echo "\n✗ FAILED: " . $response['message'] . "\n";
    }
}

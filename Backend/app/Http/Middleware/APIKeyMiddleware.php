<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;

class APIKeyMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-KEY');

        // If the API key header is missing, return a 401 Unauthorized response
        if (empty($apiKey)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Compare the provided API key with the one in the config
        if ($apiKey === config('services.api_key')) {
            return $next($request);  // Proceed if the keys match
        }

        // If the API key doesn't match, return a 401 Unauthorized response
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}

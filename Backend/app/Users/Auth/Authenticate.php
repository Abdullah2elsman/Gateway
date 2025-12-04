<?php

namespace App\Users\Auth;

use Pusher\Pusher;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Http\Request;
use Exception;

class Authenticate
{
    public function authenticate(Request $request)
    {
        try
        {
            $user = auth()->user();
            $socket_id = $request['socket_id'];
            $channel_name = $request['channel_name'];
            $key = getenv('PUSHER_APP_KEY');
            $secret = getenv('PUSHER_APP_SECRET');
            $app_id = getenv('PUSHER_APP_ID');
        
            if ($user) 
            {
                $pusher = new Pusher($key, $secret, $app_id);
                $auth = $pusher->socket_Auth($channel_name, $socket_id);
    
                return response($auth, 200);
            } 
            else 
            {
                return response('Forbidden', 403);
            }    
        }
        catch(Exception $e)
        {
            return response(['message' => 'Something went wrong.'], 401);
        }
    }
}
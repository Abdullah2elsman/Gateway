<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('notifications.group', function ($user) {
    return (bool) $user->notifications()->where('type', 'like', '%NewNotify%')->exists(); 
});

Broadcast::channel('replies.group', function ($user) {
    return (bool) $user->notifications()->where('type', 'like', '%NewReply%')->exists(); 
});
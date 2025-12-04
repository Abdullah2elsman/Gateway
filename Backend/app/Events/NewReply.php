<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewReply implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $reply;

    public function __construct($reply)
    {
        $this->reply = $reply;

        $this->current_user = auth()->user();
    }

    public function broadcastOn(): array
    {
        return [
                new PrivateChannel('annoncement.'.$this->reply->announcement->id),
            ];
    }

    // public function broadcastAs()
    // {
    //     return 'annoncements.reply';
    // }

    public function broadcastWith()
    {
        
            return [
                'id' => $this->reply->id,
                'full_name' => $this->reply->user->full_name,
                'reply' => $this->reply->reply
            ];

    }
}

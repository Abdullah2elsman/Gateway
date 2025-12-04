<?php

namespace App\Notifications;

use App\Models\UserMeta;
use Illuminate\Bus\Queueable;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Notifications\Notification;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;


class NewReply extends Notification implements ShouldQueue
{
    use Queueable;

    protected $reply;

    
    public function __construct($reply)
    {
        $this->reply = $reply;
    }

    public function via($notifiable)
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function broadcastType()
    {
        return 'replies.group';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('replies.group');
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->reply->id,
            'user_id' => $this->reply->announcement->user_id,
            'full_name' => $this->reply->user->full_name,
            'reply' => $this->reply->reply
        ]);
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Reply to Your Post')
        ->line('You have received a new reply to your announcement: "' . $this->reply->reply)
        ->line('from '. $this->reply->user->full_name)
        ->action('View Inbox', url('/inbox'))
        ->line('Thank you for engaging with our community!');
    }


    public function toArray(object $notifiable): array
    {
        return [
            'id' => $this->reply->id,
            'user_id' => $this->reply->announcement->user_id,
            'full_name' => $this->reply->user->full_name,
            'reply' => $this->reply->reply
        ];
    }
}
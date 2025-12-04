<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Notifications\Notification;

class NewNotify extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user, $notification;

    public function __construct($notification, $user)
    {
        $this->user = $user;

        $this->notification = $notification;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function broadcastType()
    {
        return 'notifications.group';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('notifications.group');
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' =>  $this->notification->id,
            'user_id' => $this->user->id,
            'full_name' => $this->user->full_name,
            'action' => $this->notification->action
        ]);
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Notification')
        ->line($this->user->full_name.' '.$this->notification->action)
        ->action('View Notifications', url('/notification'))
        ->line('Thank you for engaging with our community!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'id' =>  $this->notification->id,
            'user_id' => $this->user->id,
            'full_name' => $this->user->full_name,
            'action' => $this->notification->action
        ];
    }
}

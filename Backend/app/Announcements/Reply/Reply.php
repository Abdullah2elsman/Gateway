<?php

namespace App\Announcements\Reply;

use Exception;
use App\Models\User;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Notifications\NewReply;
use App\Models\AnnoncementReply;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Reply
{
    use SendNotification;

    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('replyToAnnouncement', $announcement);

        $this->current_user = $current_user;
    }

    public function reply(AnnoncementReply $announcement_reply, Request $request)
    {
        try
        {
            $reply = $announcement_reply->create([
                'user_id' => $this->current_user->id,
                'announce_id' => $request->announce_id,
                'reply' => $request->reply
            ]);


            $user = User::find($reply->announcement->user_id);
            
            $user->notify(new NewReply($reply));

            $this->notifyUser('has replied to an announcement', $this->current_user, 'reply_to_announcement');

            return response(['message' => "Announcement reply sent successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement reply cannot be sent. Please contact the administrator of the website."], 400);
        }
    }
}
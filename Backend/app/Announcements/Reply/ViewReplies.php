<?php

namespace App\Announcements\Reply;

use Exception;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Models\AnnoncementReply;
use Illuminate\Support\Facades\Gate;


class ViewReplies
{
    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('viewAnnouncementReplies', $announcement);
        
        $this->current_user = $current_user;
    }

    public function view(Annoncement $announcement, Request $request)
    {
        try
        {
            $announcements = $announcement->where('user_id', $this->current_user->id)->orderBy('created_at', 'desc')->get();

            $announcement_replies_collection = [];

            $index = 0;

            $number_of_messages = $this->current_user->notifications()->where('type', 'like', '%NewReply%')->count();

            foreach ($announcements as $announce)
            {
                $replies = $announce->replies;

                foreach ($replies as $reply)
                {
                    $announcement_replies_collection[$index++] = [
                        'id' => $reply->id,
                        'full_name' => $reply->user->full_name,
                        'reply' => $reply->reply
                    ];
                }
            }

            ($request->filled('read') && boolval($request->read) === true) && $this->current_user->notifications()->where('type', 'like', '%NewReply%')->delete();
            
            $replies = [
                'number_of_messages' => $number_of_messages,
                'replies' => $announcement_replies_collection
            ];

            return response($replies, 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
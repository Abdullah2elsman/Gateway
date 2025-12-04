<?php

namespace App\Announcements;

use Exception;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Create
{
    use SendNotification;

    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('createAnnouncement', $announcement);

        $this->current_user = $current_user;
    }

    public function create(?Annoncement $announcement, Request $request)
    {
        try
        {
            $announcement->create([
                'user_id' => $this->current_user->id,
                'announce' => $request->announce
            ]);

            $this->notifyUser('has created an announcement', $this->current_user, 'create_announcement');

            return response(['message' => "Announcement created successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement cannot be created. Please contact the administrator of the website."], 400);
        }
    }
}
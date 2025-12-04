<?php

namespace App\Announcements;

use Exception;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Update
{
    use SendNotification;

    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('updateAnnouncement', $announcement);

        $this->current_user = $current_user;
    }

    public function update(Annoncement $announcement, Request $request)
    {
        try
        {
            $announcement->where('id', $request->id)->update([
                'announce' => $request->announce
            ]);

            $this->notifyUser('has updated an announcement', $this->current_user, 'update_announcement');

            return response(['message' => "Announcement updated successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
<?php

namespace App\Announcements;

use Exception;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Delete
{
    use SendNotification;

    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('deleteAnnouncement', $announcement);

        $this->current_user = $current_user;
    }

    public function delete(Annoncement $announcement, $announce_id)
    {
        try
        {
            $announcement->where('id', $announce_id)->delete();

            $this->notifyUser('has deleted an announcement', $this->current_user, 'delete_announcement');

            return response(['message' => "Announcement deleted successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
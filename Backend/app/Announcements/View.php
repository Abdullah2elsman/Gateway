<?php

namespace App\Announcements;

use Exception;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class View
{
    public function __construct(?Annoncement $announcement, $current_user)
    {
        Gate::authorize('viewAnnouncement', $announcement);

        $this->current_user = $current_user;
    }

    public function view(Annoncement $announcement)
    {
        try
        {
            $announcements =  $announcement->orderBy('created_at', 'desc')->get();

            $announcements_collection = [];

            foreach ($announcements as $key => $announce)
            {
                $announcements_collection[$key] = ['id' => $announce->id, 'announce' => $announce->announce, 'created_at' => $announce->created_at->diffForHumans(), 'updated_at' => $announce->updated_at];
            }
            
            return response($announcements_collection, 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Announcement cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
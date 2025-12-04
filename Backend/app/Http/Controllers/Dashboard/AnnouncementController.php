<?php

namespace App\Http\Controllers\Dashboard;

use App\Announcements\View;
use App\Models\Annoncement;
use Illuminate\Http\Request;
use App\Announcements\Create;
use App\Announcements\Delete;
use App\Announcements\Update;
use App\Models\AnnoncementReply;
use App\Announcements\Reply\Reply;
use App\Http\Controllers\Controller;
use App\Announcements\Reply\ViewReplies;

class AnnouncementController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function create(?Annoncement $announcement, Request $request)
    {
        $this->annoucement['create'] = new Create($announcement, $this->current_user);

        return $this->annoucement['create']->create($announcement, $request);
    }

    public function reply(?Annoncement $announcement, AnnoncementReply $announcement_reply, Request $request)
    {
        $this->annoucement['reply'] = new Reply($announcement, $this->current_user);

        return $this->annoucement['reply']->reply($announcement_reply, $request);
    }

    public function update(?Annoncement $announcement, Request $request)
    {
        $this->annoucement['update'] = new Update($announcement, $this->current_user);

        return $this->annoucement['update']->update($announcement, $request);
    }

    public function delete(?Annoncement $announcement, $announce_id)
    {
        $this->annoucement['delete'] = new Delete($announcement, $this->current_user);

        return $this->annoucement['delete']->delete($announcement, $announce_id);
    }

    public function view(?Annoncement $announcement)
    {
        $this->annoucement['view'] = new View($announcement, $this->current_user);

        return $this->annoucement['view']->view($announcement);
    }

    public function viewReplies(?Annoncement $announcement, Request $request)
    {
        $this->annoucement['view-replies'] = new ViewReplies($announcement, $this->current_user);

        return $this->annoucement['view-replies']->view($announcement, $request);
    }
}
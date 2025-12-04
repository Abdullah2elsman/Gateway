<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Annoncement;
use App\Traits\CheckPermission;
use Illuminate\Auth\Access\Response;

class AnnouncementPolicy
{
    use CheckPermission;
    
    public function __construct()
    {
        $this->permissions = [
        'create-announcement' => ['create_announcement'],
        'reply-to-announcement' => ['reply_to_announcement'],
        'update-announcement' => ['update_announcement'],
        'delete-announcement' => ['delete_announcement'],
        'view-announcement' => ['view_announcement'],
        'view-announcement-replies' => ['view_announcement_replies'],
    ];

        $this->permission_collection = 'announcements';
    }

    public function createAnnouncement(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['create-announcement'], $this->permission_collection);
    }

    public function replyToAnnouncement(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['reply-to-announcement'], $this->permission_collection);
    }

    public function updateAnnouncement(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['update-announcement'], $this->permission_collection);
    }

    public function deleteAnnouncement(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['delete-announcement'], $this->permission_collection);
    }

    public function viewAnnouncement(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-announcement'], $this->permission_collection);
    }

    public function viewAnnouncementReplies(?User $current_user,?Annoncement $announce)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-announcement-replies'], $this->permission_collection);
    }
}
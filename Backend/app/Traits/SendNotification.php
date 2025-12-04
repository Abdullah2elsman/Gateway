<?php

namespace App\Traits;

use App\Models\User;
use App\Models\SysNotification;
use App\Notifications\NewNotify;
use App\Traits\CheckNotificationPermissions;
use Illuminate\Support\Facades\Notification;

trait SendNotification
{
    use CheckNotificationPermissions;
    
    public function notifyUser($action, $user, $permission_key)
    {
        $notification = SysNotification::create(['user_id' => $user->id, 'action' => $action, 'permission_key' => $permission_key]);

        $all_users = User::all();

        $users = User::where('id', '!=', $notification->user_id);

        foreach($all_users as $key => $p_user)
        {
            !$this->CheckNotificationPermission($p_user, $permission_key) && $users = $users->where('id', '!=', $p_user->id);
        }

        Notification::send($users->get(), new NewNotify($notification, $user));
    }
}
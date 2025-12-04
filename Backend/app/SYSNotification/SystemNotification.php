<?php

namespace App\SYSNotification;

use Illuminate\Http\Request;
use App\Models\SysNotification;
use App\Permissions\Permissions;
use App\Traits\CheckNotificationPermissions;

class SystemNotification extends Permissions
{
    use CheckNotificationPermissions;

    public function __construct(?SysNotification $notification, $current_user)
    {
        $this->current_user = $current_user;
    }

    public function notification(?SysNotification $notification, Request $request)
    {
            $notifications = $notification->where('user_id', '!=' ,$this->current_user->id);

            foreach($this->permission['notification'] as $permission_key)
            {
                !$this->CheckNotificationPermission($this->current_user, $permission_key) && $notifications = $notifications->where('permission_key', '!=' , $permission_key);
            }

            $notifications_collection = [];

            $notifications = $notifications->orderBy('created_at', 'desc')->get();

            $number_of_notifications = $this->current_user->notifications()->where('type', 'like', '%NewNotify%')->count();

            foreach ($notifications as $key => $notify)
            {
                $notifications_collection[$key] = [
                    'id' =>  $notify->id,
                    'user_id' => $notify->user_id,
                    'full_name' => $notify->user->full_name,
                    'action' => $notify->action
                ];
            }

            ($request->filled('read') && boolval($request->read) === true) && $this->current_user->notifications()->where('type', 'like', '%NewNotify%')->delete();
            
            $sysnotifications = [
                'number_of_notifications' => $number_of_notifications,
                'notifications' => $notifications_collection
            ];

            return response($sysnotifications, 201);
    }
}
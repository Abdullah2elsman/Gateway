<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Models\SysNotification;
use App\Http\Controllers\Controller;
use App\SYSNotification\SystemNotification;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function notification(?SysNotification $notification, Request $request)
    {
        $sysnotification = new SystemNotification($notification, $this->current_user);

        return $sysnotification->notification($notification, $request);
    }
}

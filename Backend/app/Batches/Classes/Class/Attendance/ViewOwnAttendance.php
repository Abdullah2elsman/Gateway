<?php

namespace App\Batches\Classes\Class\Attendance;

use Exception;
use App\Traits\GetUser;
use App\Models\Attendance;
use App\Traits\GetClassMeta;
use App\Traits\GetSingleClass;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionStatus;
use App\Batches\Helpers\GetAttendance;
use App\Batches\Helpers\GetSessionNotes;
use App\Batches\Helpers\ViewOwnAttendanceHelper;


class ViewOwnAttendance
{
    use CheckPermissionStatus, GetAttendance, ViewOwnAttendanceHelper, GetSingleClass, GetClassMeta, GetUser, GetSessionNotes;

    public function __construct(?Attendance $attendance, $current_user)
    {
        Gate::authorize('viewOwnAttendance', $attendance);

        $this->current_user = $current_user;
    }

    public function view(?Attendance $attendance)
    {
        try
        {
            return $this->viewAttendance($attendance, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Attendance cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
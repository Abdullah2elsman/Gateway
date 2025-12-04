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
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\GetSessionNotes;
use App\Batches\Helpers\ViewAttendanceHelper;


class ViewAttendance
{
    use CheckPermissionStatus, GetAttendance, ViewAttendanceHelper, GetSingleClass, GetClassMeta, GetUser, GetSessionNotes, CheckPermissionByBranch;

    public function __construct(?Attendance $attendance, $current_user)
    {
        Gate::authorize('viewAttendance', $attendance);
        
        $this->permission_collection = 'batches';

        $this->permission_keys = ['view_attendance'];

        $this->current_permission = 'view_attendance_by_branch';

        $this->current_user = auth()->user();
    }

    public function view(?Attendance $attendance, $class_id)
    {
        try
        {
            return $this->viewAttendance($attendance, $class_id, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Attendance cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
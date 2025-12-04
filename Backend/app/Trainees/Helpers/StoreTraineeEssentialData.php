<?php

namespace App\Trainees\Helpers;

use Carbon\Carbon;

trait StoreTraineeEssentialData
{
    protected function StoreTraineeEssentialData($trainee, $request, $class)
    {
        count($request->all()) >= 2 && $trainee->current_list = $class->List($class->list)->id;

        count($request->all()) >= 2 && $trainee->user_id = $class->current_user->id;

        $trainee->branch_id = ($class->CheckPermissionByBranch($class, $class->permission_collection, $class->current_permission, $class->permission_keys) ? $class->current_user->branch_id :  ($request->filled('branch') ? $class->Branch($request->branch)->id : $class->current_user->branch_id));

        $request->filled('full_name') && $trainee->full_name = $request->full_name;

        $request->filled('notes') && $trainee->notes = $request->notes;

        $request->filled('attend_type') && $trainee->attend_type = $request->attend_type;

        if ($request->filled('payment_type')) {
            $paymentMeta = $class->GetGeneralMeta($request->payment_type);
            $paymentMeta && $trainee->payment_type = $paymentMeta->id;
        }

        if ($request->filled('level')) {
            $levelMeta = $class->GetGeneralMeta($request->level);
            $levelMeta && $trainee->level = $levelMeta->id;
        }

        if ($request->filled('preferable_time')) {
            $timeMeta = $class->GetGeneralMeta($request->preferable_time);
            $timeMeta && $trainee->preferable_time = $timeMeta->id;
        }

        if ($request->filled('sec_preferable_time')) {
            $secTimeMeta = $class->GetGeneralMeta($request->sec_preferable_time);
            $secTimeMeta && $trainee->sec_preferable_time = $secTimeMeta->id;
        }

        ($request->filled('trainer') && $class->permission_collection === 'waitlist') && $trainee->trainer_id = $class->User($request->trainer)->id;

        ($request->filled('follow_up') && $class->permission_collection === 'pendinglist') && $trainee->follow_up = $class->User($request->follow_up)->id;

        $request->filled('test_date') && $trainee->test_date = Carbon::parse($request->test_date);

        count($request->all()) >= 2  && $trainee->moved_date = Carbon::now();

        count($request->all()) >= 2 && $trainee->save();

        return $trainee;
    }
}
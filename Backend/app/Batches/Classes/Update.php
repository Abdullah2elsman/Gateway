<?php

namespace App\Batches\Classes;

use Exception;
use App\Models\User;
use App\Models\Classes;
use App\Models\ClassMeta;
use App\Traits\GetBranch;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\GetBatchesDataHelper;

class Update extends Permissions
{
    use GetBatchesDataHelper, CheckPermissionByBranch, GetBranch, SendNotification;

    public function __construct(?Classes $class, $current_user, $class_id)
    {
        Gate::authorize('updateClasses', $class->find($class_id));

        $this->current_user = $current_user;

        $this->permission_collection = 'classes';

        $this->permission_keys = ['update_classes', 'update_own_classes'];

        $this->current_permission = 'update_classes_by_branch';
    }

    public function update(?Classes $class, ?User $user, ?ClassMeta $class_meta, Request $request, $batch_id, $class_id)
    {
        try
        {            
            $current_class = $class->where('batch_id', $batch_id)->where('id', $class_id)->first();

            $request->filled('trainer_id') ? $trainer = $user->where('id', $request->trainer_id)->first()->full_name : $trainer = $user->where('id', $current_class->trainer_id)->first()->full_name; 

            $request->filled('class_type') ? $class_type = $request->class_type : $class_type = $current_class->class_type;

            $request->filled('gate_id') ? $gate = $this->getData($class_meta, $request->gate_id) : $gate = $this->getData($class_meta, $current_class->gate);

            $request->filled('time_id') ? $time_slot = $this->getData($class_meta, $request->time_id) : $time_slot = $this->getData($class_meta, $current_class->time_slot);

            $request->filled('level_id') ? $level = $this->getData($class_meta, $request->level_id) : $level = $this->getData($class_meta, $current_class->level);

            $request->all() >= 1 && $current_class->class_name = $class_type.' - '.$time_slot.' - '.$gate.' - '.$trainer.' - '.$level;

            $request->filled('trainer_id') && $current_class->trainer_id = $request->trainer_id;

            $request->filled('class_name') && $current_class->class_name = $request->class_name;

            $request->filled('class_type') && $current_class->class_type = $request->class_type;

            $request->filled('gate_id') && $current_class->gate = $request->gate_id;

            $request->filled('time_id') && $current_class->time_slot = $request->time_id;

            $request->filled('level_id') && $current_class->level = $request->level_id;

            $request->filled('branch') && $current_class->branch_id = ($this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : $this->Branch($request->branch)->id);

            $request->class_type === 'Online' &&  $current_class->gate_url = $request->gate_url;

            $request->class_type === 'Online' && $current_class->gate_password = $request->gate_password;

            $request->all() >= 1 && $current_class->save();

            $this->notifyUser('has updated a class', $this->current_user, 'update_classes');
            
            return response(['message' => "Class updated successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Class cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
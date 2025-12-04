<?php

namespace App\Batches;

use App\Models\Batch;
use App\Traits\GetUser;
use App\Models\ClassMeta;
use App\Traits\GetBranch;
use App\Models\Attendance;
use App\Models\SessionNote;
use App\Models\TraineeClass;
use App\Traits\GetClassMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use App\Batches\Helpers\GetBatchesDataHelper;

class Duplicate extends Permissions
{
    use GetBranch, GetClassMeta, GetBatchesDataHelper, GetUser, 
    CheckPermissionByBranch, SendNotification;

    public function __construct(?Batch $batch, $current_user)
    {
        Gate::authorize('createBatches', $batch);

        $this->current_user = $current_user;

        $this->permission_collection = 'batches';
        
        $this->permission_keys = ['create_batches', 'create_own_batches'];

        $this->current_permission = 'create_batches_by_branch';
    }

    public function duplicate(?Batch $batch, Request $request)
    {
        try
        {
            $branch_id = $this->CheckPermissionByBranch($this, $this->permission_collection, $this->current_permission, $this->permission_keys) ? $this->current_user->branch_id : ($request->filled('branch') ? $this->Branch($request->branch)->id : $this->current_user->branch_id);

            $current_id= $batch->where('branch_id', $branch_id)->select('position')->max('id');

            if($current_id === NULL)
            {
                return response(['message' => "No batch found to duplicate."], 404);
            }

            $current_batch = $batch->where('id', $current_id);

            $originalBatch = $current_batch->first();


            $batch->where('branch_id', $branch_id)->where('is_active', true)->update(['is_active' => false]);
            
            $duplicateBatch = $originalBatch->replicate();

            $duplicateBatch->batch_title = "Copy of ". $originalBatch->batch_title;

            $duplicateBatch->is_active = true;

            $duplicateBatch->save();

            $originalBatch = $batch->where('id', $originalBatch->id)->first();
            
            foreach ($originalBatch->classes as $class)
            {
                $class_meta = new ClassMeta();

                $duplicateClass = $class->replicate();

                $duplicateClass->batch_id = $duplicateBatch->id;
                
                $level_position = $this->meta($class->level)->first()->position;

                $upgrade_level = ClassMeta::where('position', $level_position + 1)->exists() ? ($level_position + 1) : $level_position;

                $upgrade_level_id = ClassMeta::where('position', $upgrade_level)->first()->id;

                $duplicateClass->level = $upgrade_level_id;

                $trainer = $this->User($class->trainer_id)->full_name;

                $gate = $this->getData($class_meta, $class->gate);
            
                $time_slot = $this->getData($class_meta, $class->time_slot);
    
                $level = $this->getData($class_meta, $upgrade_level_id); 

                $duplicateClass->class_name = $class->class_type.' - '.$time_slot.' - '.$gate.' - '.$trainer.' - '.$level;
                
                $duplicateClass->save();
                
                $trainee_classes = TraineeClass::where('class_id', $class->id)->get();

                foreach ($trainee_classes as $t_class)
                {
                    $duplicate_trainee_class = new TraineeClass();

                    $duplicate_trainee_class->user_id = $this->current_user->id;
                    
                    $duplicate_trainee_class->class_id = $duplicateClass->id;

                    $duplicate_trainee_class->trainee_id = $t_class->trainee_id;

                    $duplicate_trainee_class->confirmation = $t_class->confirmation;

                    $duplicate_trainee_class->save();

                    $attendances = Attendance::where('class_id', $class->id)->where('trainee_id', $t_class->trainee_id)->get();

                    foreach ($attendances as $attendance)
                    {
                        $duplicate_attendance = new Attendance();

                        $duplicate_attendance->class_id = $duplicateClass->id;

                        $duplicate_attendance->trainee_id = $duplicate_trainee_class->trainee_id;

                        $duplicate_attendance->trainer_note = $attendance->trainer_note;

                        $duplicate_attendance->admin_note = $attendance->admin_note;

                        $duplicate_attendance->result = $attendance->trainer_note;

                        $duplicate_attendance->save();

                        $session_notes = SessionNote::where('attend_id', $attendance->id)->get();

                        foreach ($session_notes as $s_note)
                        {
                            $duplicate_session_note = new SessionNote();
                            
                            $duplicate_session_note->attend_id = $duplicate_attendance->id;

                            $duplicate_session_note->session_title = $s_note->session_title;

                            $duplicate_session_note->session_status = $s_note->session_status;

                            $duplicate_session_note->save();                            
                        }
                    }
                }
            }

            $this->notifyUser('has duplicated a batch', $this->current_user, 'create_batches');
            
            return response(['message' => "Batch duplicated successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The batch cannot be duplicated. Please contact the administrator of the website."], 400);
        }
    }
}
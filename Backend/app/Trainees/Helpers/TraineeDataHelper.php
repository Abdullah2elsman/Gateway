<?php

namespace App\Trainees\Helpers;

trait TraineeDataHelper
{
    protected function TraineeDataHelper($trainee, $request, $action, $class)
    {
        foreach($class->permission[$class->permission_collection] as $permission_key => $permission_value)
        {
             //Chcek if permission allowed to perform manual assignments by the user otherwise default assignments stored in database
            if($class->isUnique($permission_key, $action) && $class->isAllowed($class->current_user, $class->permission_collection, $permission_key, $trainee?->user_id))
            {
                
                    switch($permission_value)
                    {
                        case 'follow_up': $request->has('follow_up') && $trainee->$permission_value = $class->User($request->follow_up)->id;
                            break;
                        case 'trainer_id': $request->has('trainer') && $trainee->$permission_value = $class->User($request->trainer)->id;
                            break;
                        case 'level': $request->has('level') && $trainee->$permission_value = $class->GetGeneralMeta($class->level_collection, $request->level)->id;
                            break;
                    }
            }
        }
    }
}
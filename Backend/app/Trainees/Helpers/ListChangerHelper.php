<?php

namespace App\Trainees\Helpers;

use Carbon\Carbon;

trait ListChangerHelper
{
    protected function listChanger($trainee, $class)
    {   
        if($trainee->current_list !== $class->List($class->list)->id)
        {
            $trainee->pervious_list = $trainee->current_list;
            
            $trainee->current_list = $class->List($class->list)->id;

            $trainee->moved_date = Carbon::now();

            $trainee->save();

            return response(['message' => "Trainee moved to ".$class?->list_name." successfully."], 201);
        }

        return response(['message' => "Trainee is already in ".$class?->list_name."."], 400);

    }
}
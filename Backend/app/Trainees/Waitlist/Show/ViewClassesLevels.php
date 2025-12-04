<?php

namespace App\Trainees\Waitlist\Show;

use Exception;
use App\Models\Trainee;
use App\Models\ClassMeta;
use App\Traits\BulkHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ViewClassesLevels
{
    use BulkHelper;

    public function __construct(?Trainee $trainee, Request $request)
    {
        // Gate::authorize('assignClass', $trainee->find($request->trainee_id));

        $this->permission = 'assignClass';
        
        $this->collection_key = 'levels';

        $this->trainees = $request->filled('trainee_id') ? [$request->trainee_id] : $request->trainees;
    }

    public function viewClassesLevels(?Trainee $trainee, ?ClassMeta $level)
    {
        $this->Authorized($trainee, $this->trainees, $this);

        try
        {
            $levels = $level->where('meta_key', $this->collection_key)->get();

            $levels_collection = [];

            foreach ($levels as $key => $g_level)
            {
                $levels_collection[$key] = [
                    'id' => $g_level->id,
                    'level_name' => $g_level->meta_value
                ];
            }

            
            return response($levels_collection, 200);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Levels cannot be viewed. Please contact the administrator of the website."], 400);
        }   
    }
}
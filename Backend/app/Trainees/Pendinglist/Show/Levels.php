<?php

namespace App\Trainees\Pendinglist\Show;

use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Support\Facades\Gate;

class Levels
{
    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewPendingLevels', $trainee);

        $this->collection_key = 'pendinglist_levels';
    }

    public function viewLevels(?GeneralMeta $level)
    {
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
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Levels cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
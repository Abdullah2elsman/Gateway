<?php

namespace App\Batches\Classes\Add;

use Exception;
use App\Models\Classes;
use App\Models\ClassMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Level extends Permissions
{
    use SendNotification;

    public function __construct(?Classes $class)
    {
        Gate::authorize('authComponents', $class);

        $this->collection_key = 'levels';

        $this->current_user = auth()->user();
    }

    public function add(?ClassMeta $level, Request $request)
    {
        try
        {
            $current_position = $level->select('position')->max('position');

            $current_position === NULL && $current_position = 0;
            
            $level->create(['meta_key' => $this->collection_key, 'meta_value' => $request->level, 'position' => $current_position + 1]);
            
            $this->notifyUser('has added a new level to classes', $this->current_user, 'create_classes');

            return response(['message' => "Level added successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Level cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
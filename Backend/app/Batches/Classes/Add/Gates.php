<?php

namespace App\Batches\Classes\Add;

use Exception;
use App\Models\Classes;
use App\Models\ClassMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class Gates extends Permissions
{
    use SendNotification;
    
    public function __construct(?Classes $class)
    {
        Gate::authorize('authComponents', $class);

        $this->collection_key = 'gates';

        $this->current_user = auth()->user();
    }

    public function add(?ClassMeta $gate, Request $request)
    {
        try
        {
            $gate->create(['meta_key' => $this->collection_key, 'meta_value' => $request->gate]);

            $this->notifyUser('has added a new gate to classes', $this->current_user, 'create_classes');
            
            return response(['message' => "Gate added successfully."], 201);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Gate cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
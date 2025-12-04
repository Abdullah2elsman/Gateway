<?php

namespace App\Batches\Classes\View;

use App\Models\Classes;
use App\Models\ClassMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Permissions\Permissions;

class ViewGates extends Permissions
{
    public function __construct(?Classes $class)
    {
        Gate::authorize('authComponents', $class);

        $this->collection_key = 'gates';
    }

    public function viewGates(?ClassMeta $gate)
    {
        try
        {    
            $gates = $gate->where('meta_key', $this->collection_key)->get();

            $gates_collection = [];

            foreach ($gates as $key => $b_gate)
            {
                $gates_collection[$key] = [
                    'id' => $b_gate->id,
                    'gate_name' => $b_gate->meta_value
                ];
            }

            return response($gates_collection, 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Gates cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
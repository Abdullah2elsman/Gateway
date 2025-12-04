<?php

namespace App\Batches\Classes\View;

use App\Models\Classes;
use App\Models\ClassMeta;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;

class ViewTimeSlots extends Permissions
{
    public function __construct(?Classes $class)
    {
        Gate::authorize('authComponents', $class);

        $this->collection_key['online'] = 'time_slots_online';

        $this->collection_key['offline'] = 'time_slots_offline';

        $this->collection_key['hybrid'] = 'time_slots_hybrid';

        $this->collection_key['private'] = 'time_slots_private';
    }

    public function viewTimeSlots(?ClassMeta $time_slot, Request $request)
    {
        try
        {
            if(!$request->filled('attend_type'))
            {
                return response(['message' => 'Attend type is required'], 400);   
            }

            $attend_type = '';

            switch($request->attend_type)
            {
                case 'Online':
                    $attend_type = $this->collection_key['online'];
                    break;
                case 'Offline':
                    $attend_type = $this->collection_key['offline'];
                    break;
                case 'Hybrid':
                    $attend_type = $this->collection_key['hybrid'];
                    break;
                case 'Private':
                    $attend_type = $this->collection_key['private'];
                    break;
            }

            $time_slots = $time_slot->where('meta_key', $attend_type)->get();

            $time_slots_collection = [];

            foreach ($time_slots as $key => $g_time_slot)
            {
                $time_slots_collection[$key] = [
                    'id' => $g_time_slot->id,
                    'time_slot' => $g_time_slot->meta_value
                ];
            }

            return response($time_slots_collection, 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Time Slots cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
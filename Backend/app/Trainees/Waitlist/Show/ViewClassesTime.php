<?php

namespace App\Trainees\Waitlist\Show;

use Exception;
use App\Models\Trainee;
use App\Models\ClassMeta;
use App\Traits\BulkHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ViewClassesTime
{
    use BulkHelper;

    public function __construct(?Trainee $trainee, Request $request)
    {
        // Gate::authorize('assignClass', $trainee->find($request->trainee_id));

        $this->permission = 'assignClass';

        $this->collection_key['Online'] = 'time_slots_online';

        $this->collection_key['Offline'] = 'time_slots_offline';

        $this->collection_key['Hybrid'] = 'time_slots_hybrid';

        $this->collection_key['Private'] = 'time_slots_private';

        $this->trainees = $request->filled('trainee_id') ? [$request->trainee_id] : $request->trainees;
    }

    public function viewClassesTime(?Trainee $trainee, ?ClassMeta $time_slot, Request $request)
    {
        $this->Authorized($trainee, $this->trainees, $this);

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
                    $attend_type = $this->collection_key['Online'];
                    break;
                case 'Offline':
                    $attend_type = $this->collection_key['Offline'];
                    break;
                case 'Hybrid':
                    $attend_type = $this->collection_key['Hybrid'];
                    break;
                case 'Private':
                    $attend_type = $this->collection_key['Private'];
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
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Time Slots cannot be viewed. Please contact the administrator of the website."], 400);
        }   
    }
}
<?php

namespace App\Trainees\Waitlist\View;

use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ViewPreferableTimes
{
    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainers', $trainee);

        // Use a single shared list for all preferable times
        $this->list_name = 'preferable_times';
    }

    public function viewPreferableTimes(?GeneralMeta $preferable_time, Request $request)
    {
        try
        {
            // Fetch all preferable times from the shared list
            $preferable_times = $preferable_time->where('meta_key', $this->list_name)->get();
            
            $preferable_times_collection = [];

            foreach ($preferable_times as $key => $g_preferable_time)
            {
                $preferable_times_collection[$key] = [
                    'id' => $g_preferable_time->id,
                    'preferable_time' => $g_preferable_time->meta_value
                ];
            }
            
            return response($preferable_times_collection, 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Preferable times cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
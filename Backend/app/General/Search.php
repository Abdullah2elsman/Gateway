<?php

namespace App\General;

use App\Models\Trainee;
use App\Traits\GetUser;
use App\Traits\GetClass;
use App\Models\TraineeMeta;
use App\Traits\GetListById;
use App\Traits\GetBranchByID;
use App\Traits\GetGeneralMeta;
use App\Traits\GetBranchByName;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use App\Http\Requests\GlobalSearchRequest;
use Exception;

class Search
{
    use GetUser, GetBranchByID, GetBranchByName, GetListById, GetClass, GetGeneralMeta, CheckPermissionByBranch;

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainees', $trainee);
    }

    public function search(?Trainee $trainee, ?TraineeMeta $trainee_meta, GlobalSearchRequest $request)
    {
        try
        {
            $current_trainee = $trainee->where('full_name', 'like', '%'.$request->Input('query').'%');

            $current_trainee_meta = $trainee_meta->where('meta_value', 'like', '%'.$request->Input('query').'%');
    
            $is_exists = $current_trainee->exists() || $current_trainee_meta->exists();

            $current_trainee->exists() && $trainees = $current_trainee?->get();
            
            $current_trainee_meta->exists() && $trainees = $current_trainee_meta?->first()?->trainees;
    
            if(!boolval($is_exists))
            {
                return response(["message" => "There's no result found."],200);
            }

            $trainees_collection = [];

            $meta_collection = [];

            $follow_up_collection = [];

            foreach ($trainees as $key => $g_trainee)
            {
                $g_trainee->current_list !== null ? $status = $this?->List($g_trainee?->current_list)?->list_title : $status = $this?->getClass($g_trainee?->id)?->class_name;
                
                $status === 'Pending List' &&  $follow_up_collection = ['follow_up' => $this?->User($g_trainee?->follow_up)?->full_name];
                
                foreach($g_trainee->trainee_meta as $meta)
                {
                    $meta_collection[$meta->meta_key] = $meta->meta_value;
                }
                
                $trainees_collection[$key] = [
                    'id' => $g_trainee->id,
                    'status' => $status,
                    'full_name' => $g_trainee?->full_name,
                    'attend_type' => $g_trainee?->attend_type,
                    'test_date' => $g_trainee?->test_date,
                    'branch' => $this?->Branch($g_trainee?->branch_id)?->first()?->district,
                    'trainer' => $g_trainee?->user?->full_name,
                    'payment_type' => $this?->GetGeneralMeta($g_trainee?->payment_type)?->meta_value,
                    ...$follow_up_collection,
                    ...$meta_collection
                ];

                $meta_collection = [];
            }

            return response($trainees_collection, 200);
        }
        catch(Exception $e)
        {
            return response("Something went wrong.",400);
        }
    }
}
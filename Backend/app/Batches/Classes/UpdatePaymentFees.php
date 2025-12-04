<?php

namespace App\Batches\Classes;

use Exception;
use App\Models\Classes;
use App\Traits\CreateMeta;
use App\Traits\UpdateMeta;
use App\Models\TraineeMeta;
use App\Models\Trainee;
use Illuminate\Http\Request;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;


class UpdatePaymentFees extends Permissions
{
    use UpdateMeta, CreateMeta;

    public function __construct(?Classes $class, Request $request)
    {
        Gate::authorize('updateClasses', $class->find($request->class_id));
    }

    public function update(?TraineeMeta $TraineeMeta, Request $request, $trainee_id)
    {
        try
        {   
            if(!$request->filled('payment') || !Trainee::where('id', $trainee_id)->exists())
            {
                return response(['message' => "Payment/Fees field is not set or trainee doesn't exists."], 400);
            }

            $meta_key = 'paid_value';

            $TraineeMeta->where('trainee_id', $trainee_id)->where('meta_key', $meta_key)->exists() ?

            $this->UpdateMeta($TraineeMeta, 'trainee_id', $trainee_id, $meta_key, $request->payment)
            :
            $this->CreateMeta($TraineeMeta, 'trainee_id', $trainee_id, $meta_key, $request->payment);
            
            return response(['message' => "Payment/Fees updated successfully."], 201);

        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Payment/Fees cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
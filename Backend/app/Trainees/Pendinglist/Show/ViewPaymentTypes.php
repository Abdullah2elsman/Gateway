<?php

namespace App\Trainees\Pendinglist\Show;

use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Support\Facades\Gate;

class ViewPaymentTypes
{
    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('addPendingPayment', $trainee);

        $this->collection_key = 'payment_types';
    }

    public function viewPaymentTypes(?GeneralMeta $payment_type)
    {
        try
        {
            $payment_types = $payment_type->where('meta_key', $this->collection_key)->get();
            
            $payment_types_collection = [];

            foreach ($payment_types as $key => $g_payment_type)
            {
                $payment_types_collection[$key] = [
                    'id' => $g_payment_type->id,
                    'payment_title' => $g_payment_type->meta_value
                ];
            }
            
            return response($payment_types_collection, 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Payment types cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
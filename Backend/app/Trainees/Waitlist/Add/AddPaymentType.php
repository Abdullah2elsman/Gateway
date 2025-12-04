<?php

namespace App\Trainees\Waitlist\Add;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;

class AddPaymentType
{
    use SendNotification;

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainers', $trainee);
        
        $this->list_name = 'payment_types';

        $this->current_user = auth()->user();
    }

    public function addPaymentType(?GeneralMeta $payment_type, Request $request)
    {
        try
        {
            // Validate required field
            if (!$request->filled('payment_type')) 
            {
                return response(['message' => 'Payment type is required.'], 400);
            }

            // Trim and normalize the payment type value
            $payment_type_value = trim($request->payment_type);

            // Check if payment type already exists (case-insensitive)
            $is_exists = $payment_type->where('meta_key', $this->list_name)
                                      ->whereRaw('LOWER(meta_value) = ?', [strtolower($payment_type_value)])
                                      ->exists();
            
            if ($is_exists) 
            {
                return response(['message' => 'Payment type already exists'], 400);
            }
            
            $payment_type->create([
                'meta_key' => $this->list_name,
                'meta_value' => $payment_type_value,
            ]);

            $this->notifyUser('has added a new payment type to the wait list', $this->current_user, 'create_trainees_in_waitlist');

            return response(['message' => 'Payment type added successfully'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. Payment type cannot be added. Please contact the administrator of the website."], 400);
        }
    }
}
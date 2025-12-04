<?php

namespace App\Http\Controllers\GoogleForm;

use Exception;
use App\Models\Trainee;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GoogleFormController extends Controller
{
    /**
     * Receive data from Google Form and save to database
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function receiveFormData(Request $request)
    {
        try {
            // Log incoming request for debugging
            Log::info('Google Form Data Received', $request->all());

            // Validate incoming data based on your form fields
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'mobile_number' => 'required|string',                
                'preferable_time' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }


            // Create trainee record
            $trainee = new Trainee();
            $trainee->full_name = $request->full_name;
            $trainee->attend_type = 'Offline'; // Default for Google Form submissions
            $trainee->preferable_time = $request->preferable_time; // The preferable time return directly
            $trainee->branch_id = 2423; // => Giaz
            $trainee->current_list = 2423; // => Wait List
            $trainee->user_id = 2423; // => Mahmoud
            $trainee->moved_date = now();
            $trainee->save();
            
            // Create meta of trainee (age_group => Adult)
            $meta_age_group = new TraineeMeta();
            $meta_age_group->trainee_id = $trainee->id;
            $meta_age_group->meta_key = "age_group";
            $meta_age_group->meta_value = "Adult";
            $meta_age_group->save();

            // Create meta of trainee (phone_number)
            $meta_phone_number = new TraineeMeta();
            $meta_phone_number->trainee_id = $trainee->id;
            $meta_phone_number->meta_key = "phone_number_0";
            $meta_phone_number->meta_value = $request->mobile_number;
            $meta_phone_number->save();
            return response()->json([
                'success' => true,
                'message' => 'Form data saved successfully',
                'trainee_id' => $trainee->id,
                'trainee' => $trainee,
                'meta_age_group' => $meta_age_group,
                'meta_phone_number' =>$meta_phone_number
            ], 201);

        } catch (Exception $e) {
            Log::error('Google Form Error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save form data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

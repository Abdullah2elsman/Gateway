<?php

namespace App\Trainees\Pendinglist\Deletes;

use Exception;
use App\Models\Trainee;
use App\Models\GeneralMeta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\CheckPermission;

class DeletePaymentType
{
    use CheckPermission;

    protected $current_user;
    protected $list_name = 'payment_types';

    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function deletePaymentType($id)
    {
        try {
            // Authorization check - ensure user has permission to manage pendinglist payment types
            $permissions = ['create_trainees', 'update_trainees', 'update_own_trainees', 'create_trainees_by_branch', 'update_trainees_by_branch'];
            if (!$this->CheckPermission($this->current_user, $permissions, 'pendinglist')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to perform this action'
                ], 403);
            }

            // Start database transaction
            DB::beginTransaction();

            // Find the payment type by ID and meta_key
            $gPaymentType = GeneralMeta::where('id', $id)
                ->where('meta_key', $this->list_name)
                ->first();

            if (!$gPaymentType) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Payment type not found'
                ], 404);
            }

            // Check if any trainees are currently assigned to this payment type
            $traineeCount = Trainee::where('payment_type', $id)->count();

            // Update trainees to remove this payment type assignment
            $affected = 0;
            if ($traineeCount > 0) {
                $affected = Trainee::where('payment_type', $id)->update(['payment_type' => null]);
            }

            // Delete the payment type meta entry
            $gPaymentType->delete();

            // Commit the transaction
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Payment type deleted successfully',
                'affected_trainees' => $affected,
                'payment_type_name' => $gPaymentType->meta_value ?? 'Unknown'
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error deleting payment type: ' . $e->getMessage(), [
                'payment_type_id' => $id,
                'user_id' => $this->current_user->id ?? null
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Payment type cannot be deleted. Please contact the administrator.'
            ], 500);
        }
    }
}

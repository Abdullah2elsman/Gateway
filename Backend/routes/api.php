<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Dashboard\RolesController;
use App\Http\Controllers\Dashboard\GeneralController;
use App\Http\Controllers\Dashboard\BranchesController;
use App\Http\Controllers\Dashboard\SettingsController;
use App\Http\Controllers\Dashboard\AnnouncementController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Dashboard\Users\UserController;
use App\Http\Controllers\Dashboard\Users\UsersController;
use App\Http\Controllers\Dashboard\Users\PendingUsersController;
use App\Http\Controllers\Dashboard\Trainees\TraineesController;
use App\Http\Controllers\Dashboard\Lists\WaitlistController;
use App\Http\Controllers\Dashboard\Lists\PendinglistController;
use App\Http\Controllers\Dashboard\Lists\RefundlistController;
use App\Http\Controllers\Dashboard\Lists\HoldlistController;
use App\Http\Controllers\Dashboard\Lists\BlacklistController;
use App\Http\Controllers\Dashboard\Batches\BatchesController;
use App\Http\Controllers\Dashboard\Batches\Classes\ClassController;
use App\Http\Controllers\Dashboard\Batches\Classes\ClassesController;
use App\Http\Controllers\Dashboard\Attendance\AttendanceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ============================================================================
// API VERSION 1
// ============================================================================

Route::prefix('v1')->group(function () {

    // ========================================================================
    // PUBLIC ROUTES (No Authentication Required)
    // ========================================================================


    // Authentication Routes
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/auth', [LoginController::class, 'login']);
    Route::post('/forget-password', [ResetPasswordController::class, 'forgetPassword'])->name('ForgetPassword');
    Route::post('/reset-password', [ResetPasswordController::class, 'restPassword'])->name('ResetPassword');

    // Public Data
    Route::get('/branches', [BranchesController::class, 'viewBranches']);
    Route::get('/site-info', [SettingsController::class, 'view']);

    // Google Form Integration (Public - No Auth Required)
    Route::post('/google-form/submit', [\App\Http\Controllers\GoogleForm\GoogleFormController::class, 'receiveFormData']);
    Route::get('/google-form/test', [\App\Http\Controllers\GoogleForm\GoogleFormController::class, 'test']);

    // ========================================================================
    // PROTECTED ROUTES (Authentication Required)
    // ========================================================================

    Route::group(['middleware' => ['auth:sanctum']], function () {

        // --------------------------------------------------------------------
        // BRANCHES
        // --------------------------------------------------------------------
        Route::prefix('dashboard/branches')->group(function () {
            Route::get('/', [BranchesController::class, 'view']);
            Route::post('/create', [BranchesController::class, 'create']);
            Route::put('/{id}/update', [BranchesController::class, 'update']);
            Route::delete('/{id}/delete', [BranchesController::class, 'delete']);
            Route::post('/delete', [BranchesController::class, 'bulkDelete']);
        });
        Route::get('/dashboard/view-branches', [BranchesController::class, 'viewBranches']);

        // --------------------------------------------------------------------
        // ROLES & PERMISSIONS
        // --------------------------------------------------------------------
        Route::prefix('dashboard/roles')->group(function () {
            Route::get('/', [RolesController::class, 'view']);
            Route::get('/{id}/permissions', [RolesController::class, 'viewPermissions']);
            Route::post('/create', [RolesController::class, 'create']);
            Route::put('/{id}/update', [RolesController::class, 'update']);
            Route::delete('/{id}/delete', [RolesController::class, 'delete']);
            Route::post('/delete', [RolesController::class, 'bulkDelete']);
        });

        // --------------------------------------------------------------------
        // USERS MANAGEMENT
        // --------------------------------------------------------------------

        // All Users
        Route::prefix('dashboard/users')->group(function () {
            Route::put('/', [UsersController::class, 'view']);
            Route::get('/roles', [UsersController::class, 'viewRoles']);
            Route::post('/create', [UsersController::class, 'create']);
            Route::put('/{id}/update', [UsersController::class, 'update']);
            Route::delete('/{id}/delete', [UsersController::class, 'delete']);
            Route::post('/delete', [UsersController::class, 'bulkDelete']);
        });

        // Current User Profile
        Route::prefix('dashboard/user')->group(function () {
            Route::get('/', [UserController::class, 'view']);
            Route::post('/update', [UserController::class, 'update']);
            Route::delete('/delete', [UserController::class, 'delete']);
        });

        // Pending Users
        Route::prefix('dashboard/pending-users')->group(function () {
            Route::put('/', [PendingUsersController::class, 'view']);
            Route::put('/{id}/activate', [PendingUsersController::class, 'activate']);
            Route::put('/activate', [PendingUsersController::class, 'bulkActivate']);
            Route::delete('/{id}/delete', [PendingUsersController::class, 'delete']);
            Route::post('/delete', [PendingUsersController::class, 'bulkDelete']);
        });

        // --------------------------------------------------------------------
        // TRAINEES (All Trainees View)
        // --------------------------------------------------------------------
        Route::prefix('dashboard/trainees')->group(function () {
            Route::get('/', [TraineesController::class, 'view']);
            Route::get('/{trainee_id}', [TraineesController::class, 'viewSingleTrainee']);
        });

        // --------------------------------------------------------------------
        // TRAINEE LISTS
        // --------------------------------------------------------------------

        // WAITLIST
        Route::prefix('dashboard/waitlist')->group(function () {
            // View
            Route::put('/', [WaitlistController::class, 'view']);
            Route::get('/view-trainers', [WaitlistController::class, 'viewTrainers']);

            // CRUD Operations
            Route::post('/create', [WaitlistController::class, 'create']);
            Route::put('/{id}/update', [WaitlistController::class, 'update']);
            Route::delete('/{id}/delete', [WaitlistController::class, 'delete']);
            Route::post('/delete', [WaitlistController::class, 'bulkDelete']);

            // Levels Management
            Route::get('/levels', [WaitlistController::class, 'viewLevels']);
            Route::post('/level/add', [WaitlistController::class, 'addLevel']);
            Route::delete('/level/{id}/delete', [WaitlistController::class, 'deleteLevel']);

            // Payment Types Management
            Route::get('/payments', [WaitlistController::class, 'viewPayment']);
            Route::post('/payment/add', [WaitlistController::class, 'addPayment']);
            Route::delete('/payment/{id}/delete', [WaitlistController::class, 'deletePayment']);

            // Time Slots Management
            Route::get('/times', [WaitlistController::class, 'viewTimes']);
            Route::post('/time/add', [WaitlistController::class, 'addTime']);
            Route::delete('/time/{id}/delete', [WaitlistController::class, 'deleteTime']);

            // Class Assignment
            Route::put('/class/view-classes', [WaitlistController::class, 'viewClasses']);
            Route::put('/class/view-classes-levels', [WaitlistController::class, 'viewClassesLevels']);
            Route::put('/class/view-classes-times', [WaitlistController::class, 'viewClassesTimes']);
            Route::post('/{trainee_id}/assign-class', [WaitlistController::class, 'assignClass']);
            Route::post('/assign-class', [WaitlistController::class, 'bulkAssignClass']);

            // Move to Other Lists
            Route::put('/{id}/hold', [WaitlistController::class, 'moveToHold']);
            Route::put('/{id}/refund', [WaitlistController::class, 'moveToRefund']);
            Route::put('/{id}/black', [WaitlistController::class, 'moveToBlack']);
            Route::put('/hold', [WaitlistController::class, 'bulkMoveToHold']);
            Route::put('/refund', [WaitlistController::class, 'bulkMoveToRefund']);
            Route::put('/black', [WaitlistController::class, 'bulkMoveToBlack']);
        });

        // PENDING LIST
        Route::prefix('dashboard/pendinglist')->group(function () {
            // View
            Route::put('/', [PendinglistController::class, 'view']);
            Route::get('/view-trainers', [PendinglistController::class, 'viewTrainers']);
            Route::get('/view-admins', [PendinglistController::class, 'viewFollowUp']);

            // CRUD Operations
            Route::post('/create', [PendinglistController::class, 'create']);
            Route::put('/{id}/update', [PendinglistController::class, 'update']);
            Route::delete('/{id}/delete', [PendinglistController::class, 'delete']);
            Route::post('/delete', [PendinglistController::class, 'bulkDelete']);

            // Levels Management
            Route::get('/levels', [PendinglistController::class, 'viewLevels']);
            Route::post('/level/add', [PendinglistController::class, 'addLevel']);
            Route::delete('/level/{id}/delete', [PendinglistController::class, 'deleteLevel']);

            // Payment Types Management
            Route::get('/payments', [PendinglistController::class, 'viewPayment']);
            Route::post('/payment/add', [PendinglistController::class, 'addPayment']);
            Route::delete('/payment/{id}/delete', [PendinglistController::class, 'deletePayment']);

            // Assignments
            Route::put('/{trainee_id}/assign-trainer', [PendinglistController::class, 'assignTrainer']);
            Route::put('/assign-trainer', [PendinglistController::class, 'bulkAssignTrainer']);
            Route::put('/{trainee_id}/assign-level', [PendinglistController::class, 'assignLevel']);
            Route::put('/assign-level', [PendinglistController::class, 'bulkAssignLevel']);
        });

        // REFUND LIST
        Route::prefix('dashboard/refundlist')->group(function () {
            Route::put('/', [RefundlistController::class, 'view']);
            Route::get('/view-trainers', [RefundlistController::class, 'viewTrainers']);
            Route::put('/{id}/update', [RefundlistController::class, 'update']);
            Route::delete('/{id}/delete', [RefundlistController::class, 'delete']);
            Route::post('/delete', [RefundlistController::class, 'bulkDelete']);
            Route::put('/{id}/wait', [RefundlistController::class, 'moveToWait']);
            Route::put('/wait', [RefundlistController::class, 'bulkMoveToWait']);
        });

        // HOLD LIST
        Route::prefix('dashboard/holdlist')->group(function () {
            Route::put('/', [HoldlistController::class, 'view']);
            Route::get('/view-trainers', [HoldlistController::class, 'viewTrainers']);
            Route::put('/{id}/update', [HoldlistController::class, 'update']);
            Route::delete('/{id}/delete', [HoldlistController::class, 'delete']);
            Route::post('/delete', [HoldlistController::class, 'bulkDelete']);
            Route::put('/{id}/wait', [HoldlistController::class, 'moveToWait']);
            Route::put('/wait', [HoldlistController::class, 'bulkMoveToWait']);
        });

        // BLACKLIST
        Route::prefix('dashboard/blacklist')->group(function () {
            Route::put('/', [BlacklistController::class, 'view']);
            Route::get('/view-trainers', [BlacklistController::class, 'viewTrainers']);
            Route::put('/{id}/update', [BlacklistController::class, 'update']);
            Route::delete('/{id}/delete', [BlacklistController::class, 'delete']);
            Route::post('/delete', [BlacklistController::class, 'bulkDelete']);
            Route::put('/{id}/wait', [BlacklistController::class, 'moveToWait']);
            Route::put('/wait', [BlacklistController::class, 'bulkMoveToWait']);
        });

        // --------------------------------------------------------------------
        // BATCHES & CLASSES
        // --------------------------------------------------------------------

        // BATCHES
        Route::prefix('dashboard/batches')->group(function () {
            // Batch CRUD
            Route::put('/', [BatchesController::class, 'view']);
            Route::post('/create', [BatchesController::class, 'create']);
            Route::put('/{id}/update', [BatchesController::class, 'update']);
            Route::delete('/{id}/delete', [BatchesController::class, 'delete']);

            // Batch Actions
            Route::put('/{id}/activate', [BatchesController::class, 'activate']);
            Route::put('/{id}/end', [BatchesController::class, 'end']);
            Route::post('/duplicate', [BatchesController::class, 'duplicate']);
            Route::put('/{batch_id}/filter-classes', [BatchesController::class, 'filterClasses']);
            Route::get('/{batch_id}/view-select-classes', [ClassController::class, 'viewClasses']);


            // CLASSES within Batches
            Route::get('/{batch_id}/classes/{class_id}', [ClassController::class, 'viewClass']);
            Route::post('/{batch_id}/classes/create', [ClassesController::class, 'createClass']);
            Route::put('/{batch_id}/classes/{id}/update', [ClassesController::class, 'updateClass']);
            Route::delete('/{batch_id}/classes/{class_id}/delete', [ClassesController::class, 'deleteClass']);

            // Class Trainee Management
            Route::put('/classes/{trainee_id}/payment-update', [ClassController::class, 'updateTraineePayment']);
            Route::put('/{class_id}/classes/{trainee_id}/confirm', [ClassController::class, 'confirmation']);

            // Trainee Notes
            Route::get('/{class_id}/classes/{trainee_id}/view-admin-note', [ClassController::class, 'viewAdminNote']);
            Route::get('/{class_id}/classes/{trainee_id}/view-trainer-note', [ClassController::class, 'viewTrainerNote']);
            Route::put('/{class_id}/classes/{trainee_id}/add-admin-note', [ClassController::class, 'addAdminNote']);
            Route::put('/{class_id}/classes/{trainee_id}/add-trainer-note', [ClassController::class, 'addTrainerNote']);

            // Move Trainees from Class to Lists (Single)
            Route::put('/{class_id}/classes/{trainee_id}/move-to-black', [ClassesController::class, 'moveToBlack']);
            Route::put('/{class_id}/classes/{trainee_id}/move-to-hold', [ClassesController::class, 'moveToHold']);
            Route::put('/{class_id}/classes/{trainee_id}/move-to-refund', [ClassesController::class, 'moveToRefund']);
            Route::put('/{class_id}/classes/{trainee_id}/move-to-wait', [ClassesController::class, 'moveToWait']);
            Route::put('/classes/{trainee_id}/switch-class', [ClassesController::class, 'switchClass']);

            // Move Trainees from Class to Lists (Bulk)
            Route::put('/{class_id}/classes/move-to-black', [ClassesController::class, 'bulkMoveToBlack']);
            Route::put('/{class_id}/classes/move-to-hold', [ClassesController::class, 'bulkMoveToHold']);
            Route::put('/{class_id}/classes/move-to-refund', [ClassesController::class, 'bulkMoveToRefund']);
            Route::put('/{class_id}/classes/move-to-wait', [ClassesController::class, 'bulkMoveToWait']);
            Route::put('/classes/switch-class', [ClassesController::class, 'bulkSwitchClass']);
        });

        // CLASSES - Global Resources (not batch-specific)
        Route::prefix('dashboard/batches/classes')->group(function () {
            // View Resources
            Route::get('/trainers', [ClassesController::class, 'viewTrainers']);
            Route::get('/gates', [ClassesController::class, 'viewGates']);
            Route::get('/levels', [ClassesController::class, 'viewLevels']);
            Route::put('/time-slots', [ClassesController::class, 'viewTimeSlots']);

            // Add Resources
            Route::post('/gate/add', [ClassesController::class, 'createGate']);
            Route::post('/level/add', [ClassesController::class, 'createLevel']);
            Route::post('/time-slot/add', [ClassesController::class, 'createTimeSlot']);
        });


        // --------------------------------------------------------------------
        // ATTENDANCE
        // --------------------------------------------------------------------
        Route::get('/dashboard/attendances', [AttendanceController::class, 'viewOwn']);
        Route::get('/dashboard/batches/classes/{class_id}/attendance', [AttendanceController::class, 'view']);
        Route::put('/dashboard/batches/classes/attendance/{session_id}', [AttendanceController::class, 'updateSessionNote']);
        Route::patch('/dashboard/batches/classes/attendance/{session_id}/toggle', [AttendanceController::class, 'toggleSessionStatus']);

        // --------------------------------------------------------------------
        // ANNOUNCEMENTS
        // --------------------------------------------------------------------
        Route::prefix('dashboard/announcements')->group(function () {
            Route::get('/', [AnnouncementController::class, 'view']);
            Route::put('/replies', [AnnouncementController::class, 'viewReplies']);
            Route::post('/create', [AnnouncementController::class, 'create']);
            Route::post('/reply', [AnnouncementController::class, 'reply']);
            Route::put('/update', [AnnouncementController::class, 'update']);
            Route::delete('/{announce_id}/delete', [AnnouncementController::class, 'delete']);
        });

        // --------------------------------------------------------------------
        // NOTIFICATIONS
        // --------------------------------------------------------------------
        Route::put('/dashboard/notifications', [NotificationController::class, 'notification']);

        // --------------------------------------------------------------------
        // SETTINGS
        // --------------------------------------------------------------------
        Route::post('/dashboard/settings/update', [SettingsController::class, 'update']);

        // --------------------------------------------------------------------
        // SEARCH
        // --------------------------------------------------------------------
        Route::get('/dashboard/search', [GeneralController::class, 'search']);

        // --------------------------------------------------------------------
        // AUTHENTICATION & BROADCASTING
        // --------------------------------------------------------------------
        Route::post('/broadcasting/auth', [LoginController::class, 'authenticate']);
        Route::post('/logout', [LoginController::class, 'logout']);
    });
});

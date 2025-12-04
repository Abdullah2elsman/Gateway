<?php

namespace App\Providers;

use App\Models\Role;
use App\Models\User;
use App\Models\Batch;
use App\Models\Branch;
use App\Models\Classes;
use App\Models\Trainee;
use App\Models\Attendance;
use App\Models\Annoncement;
use App\Models\GeneralMeta;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use App\Policies\BatchPolicy;
use App\Policies\BranchPolicy;
use App\Policies\ClassesPolicy;
use App\Policies\TraineePolicy;
use App\Policies\AttendancePolicy;
use App\Policies\GeneralMetaPolicy;
use App\Policies\AnnouncementPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Passwords\PasswordBrokerManager;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        Trainee::class => TraineePolicy::class,
        Branch::class => BranchPolicy::class,
        Role::class => RolePolicy::class,
        User::class => UserPolicy::class,
        Batch::class => BatchPolicy::class,
        Classes::class => ClassesPolicy::class,
        Attendance::class => AttendancePolicy::class,
        Annoncement::class => AnnouncementPolicy::class,
        GeneralMeta::class => GeneralMetaPolicy::class
    ];

    public function boot()
    {
        $this->registerPolicies();

        $this->registerPasswordBroker();
    }

    protected function registerPasswordBroker()
    {
        $this->app->bind(PasswordBrokerManager::class, function ($app) {
            return new PasswordBrokerManager($app);
        });
    }
}
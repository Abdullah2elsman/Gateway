<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Policies\BranchPolicy;
use App\Policies\RolePolicy;
use App\Policies\PendingUserPolicy;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {

    }

    public function boot(): void
    {        
        ResetPassword::createUrlUsing(function (User $user, string $token) {
            return 'http://178.128.168.94/reset-password?token='.$token;
        });
    }
}
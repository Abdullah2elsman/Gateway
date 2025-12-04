<?php

namespace App\Batches\Classes\View;

use Exception;
use App\Models\User;
use App\Models\Classes;
use App\Models\Permission;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;
use App\Traits\ShowRoleList;

class ViewTrainers extends Permissions
{
    use ShowRoleList;
    
    public function __construct(?Classes $class)
    {
        Gate::authorize('authComponents', $class);

        $this->collection = 'general';

        $this->permission = 'show_trainers_list';
    }

    public function show(?User $user, ?Permission $permission)
    {
        try
        {
            return $this->viewList($user, $permission, $this);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The trainer list cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
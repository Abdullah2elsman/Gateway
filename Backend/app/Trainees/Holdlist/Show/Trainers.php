<?php

namespace App\Trainees\Holdlist\Show;

use Exception;
use App\Models\User;
use App\Models\Trainee;
use App\Models\Permission;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Gate;
use App\Traits\ShowRoleList;

class Trainers extends Permissions
{
    use ShowRoleList;
    
    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewHoldTrainers', $trainee);
        
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
            return response(['message' => "Something went wrong. The admins list cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
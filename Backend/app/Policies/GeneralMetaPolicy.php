<?php

namespace App\Policies;

use App\Models\User;
use App\Models\GeneralMeta;
use App\Traits\CheckPermission;
use Illuminate\Auth\Access\Response;

class GeneralMetaPolicy
{
    use CheckPermission;
    
    public function __construct()
    {
        $this->permissions = [
        'view-settings' => ['view_settings'],
        'update-settings' => ['update_settings']
    ];

        $this->permission_collection = 'settings';
    }

    public function viewSettings(?User $current_user,?GeneralMeta $general_meta)
    {
        return $this->CheckPermission($current_user, $this->permissions['view-settings'], $this->permission_collection);
    }

    public function updateSettings(?User $current_user,?GeneralMeta $general_meta)
    {
        return $this->CheckPermission($current_user, $this->permissions['update-settings'], $this->permission_collection);
    }
}
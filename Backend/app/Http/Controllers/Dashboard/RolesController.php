<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Requests\BulkRoleRequest;
use App\Models\Role;
use App\Models\Permission;
use App\Roles\Create;
use App\Roles\Update;
use App\Roles\View;
use App\Roles\ViewPermissions;
use App\Roles\Deletes\Delete;
use App\Roles\Deletes\BulkDelete;

class RolesController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function view(?Role $role)
    {
        $this->role['view'] = new View($role);

        return $this->role['view']->view($role);
    }

    public function viewPermissions(?Role $role, $id)
    {
        $this->role['view'] = new ViewPermissions($role);

        return $this->role['view']->view($role, $id);
    }

    public function create(?Role $role, ?Permission $permission, RoleRequest $request)
    {
        $this->role['create'] = new Create($role);

        return $this->role['create']->create($role, $permission, $request);
    }

    public function update(?Role $role, ?Permission $permission, RoleRequest $request, $id)
    {
        $this->role['update'] = new Update($role);

        return $this->role['update']->update($role, $permission, $request, $id);
    }

    public function delete(?Role $role, $id)
    {
        $this->role['delete'] = new Delete($role);

        return $this->role['delete']->delete($role, $id);
    }

    public function bulkDelete(?Role $role, BulkRoleRequest $request)
    {
        $this->role['bulk-delete'] = new BulkDelete();

        return $this->role['bulk-delete']->delete($role, $request);
    }
}
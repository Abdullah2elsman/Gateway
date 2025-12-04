<?php

namespace App\Http\Controllers\Dashboard\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\BulkRequest;
use App\Users\Create;
use App\Users\Update;
use App\Users\View;
use App\Users\ViewRoles;
use App\Users\Deletes\Delete;
use App\Users\Deletes\BulkDelete;
use App\Models\User;
use App\Models\Role;
use App\Models\UserMeta;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function create(?User $user, UserMeta $UserMeta, CreateUserRequest $request)
    {
        $this->user['create'] = new Create($user, $this->current_user);

        return $this->user['create']->create($user, $UserMeta, $request);
    }

    public function view(?User $user, Request $request)
    {
        $this->user['view'] = new View($this->current_user);

        return $this->user['view']->view($user, $request);
    }

    public function viewRoles(?Role $role)
    {
        $this->user['view-roles'] = new ViewRoles($this->current_user);

        return $this->user['view-roles']->view($role);
    }

    public function update(?User $user, UserMeta $UserMeta, Request $request, $id)
    {
        $this->user['update'] = new Update($user, $this->current_user, $id);

        return $this->user['update']->update($user, $UserMeta, $request, $id);
    }

    public function delete(?User $user, $id)
    {
        $this->user['delete'] = new Delete($user, $id);

        return $this->user['delete']->delete($user, $id);
    }

    public function bulkDelete(?User $user, BulkRequest $request)
    {
        $this->user['bulk-delete'] = new BulkDelete();

        return $this->user['bulk-delete']->delete($user, $request);
    }
}
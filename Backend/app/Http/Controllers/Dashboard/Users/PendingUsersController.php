<?php

namespace App\Http\Controllers\Dashboard\Users;

use App\Models\User;
use Illuminate\Http\Request;
use App\Users\PendingUsers\View;
use App\Http\Requests\BulkRequest;
use App\Users\PendingUsers\Delete;
use App\Http\Controllers\Controller;
use App\Users\PendingUsers\Activate;
use App\Users\PendingUsers\BulkDelete;
use App\Users\PendingUsers\BulkActivate;


class PendingUsersController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function view(?User $user, Request $request)
    {
        $this->user['view'] = new View($this->current_user);

        return $this->user['view']->view($user, $request);
    }

    public function activate(?User $user, $id)
    {
        $this->user['activate'] = new Activate($user, $id);

        return $this->user['activate']->activate($user, $id);
    }

    public function bulkActivate(?User $user, BulkRequest $request)
    {
        $this->user['bulk-activate'] = new BulkActivate();

        return $this->user['bulk-activate']->activate($user, $request);
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
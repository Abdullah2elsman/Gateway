<?php

namespace App\Http\Controllers\Dashboard\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Users\Self\Update;
use App\Users\Self\View;
use App\Users\Self\Delete;
use App\Models\User;
use App\Models\UserMeta;

class UserController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function view(?User $user)
    {
        $this->user['view'] = new View($this->current_user);

        return $this->user['view']->view();
    }

    public function update(UserMeta $UserMeta, Request $request)
    {
        $this->user['update'] = new Update($this->current_user);

        return $this->user['update']->update($UserMeta, $request);
    }

    public function delete(?User $user)
    {
        $this->user['delete'] = new Delete($this->current_user);

        return $this->user['delete']->delete();
    }
}
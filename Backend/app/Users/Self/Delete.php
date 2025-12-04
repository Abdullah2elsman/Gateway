<?php

namespace App\Users\Self;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Exception;

class Delete
{
    public function __construct($current_user)
    {
        Gate::authorize('deleteSelf', $current_user);

        $this->current_user = $current_user;
    }

    public function delete()
    {
        try
        {
            $this->current_user->delete();

            return response(['message' => "Your account deleted successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. Your account cannot be deleted. Please contact the administrator of the website."], 400);
        }
    }
}
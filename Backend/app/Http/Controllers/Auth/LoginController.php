<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Users\Auth\Login;
use App\Users\Auth\Logout;
use Illuminate\Http\Request;
use App\Users\Auth\Authenticate;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    
    protected Login $auth;
    protected Logout $logout;
    protected Authenticate $broadcast_auth;
    
    public function __construct()
    {
        $this->auth = new Login();
        
        $this->logout = new Logout();
        
        $this->broadcast_auth = new Authenticate();
    }
    
    public function login(Request $request)
    {
        return $this->auth->login($request);
    }
    
    public function authenticate(Request $request)
    {
        return $this->broadcast_auth->authenticate($request);
    }
    
    public function logout(User $user)
    {
        return $this->logout->logout($user);
    }
}

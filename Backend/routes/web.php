<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ImageAccessController;

Route::get('/user/{image}/{token}', [ImageAccessController::class, 'image']);

Route::get('/logo/{image}', [ImageAccessController::class, 'publicImage']);



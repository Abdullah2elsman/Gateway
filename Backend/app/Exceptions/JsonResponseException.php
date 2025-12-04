<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class JsonResponseException extends Exception
{
    public function render($request, Throwable $exception)
    {
        $request->headers->set('Accept', 'application/json');

        return parent::render($request, $exception);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BranchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'country' => ['required', 'string'],
            'city' => ['required', 'string'],
            'district' => ['required', 'string'],
        ];
    }
}

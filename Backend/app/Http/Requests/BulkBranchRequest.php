<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkBranchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'branches' => ['required', 'array'],
            'branches.*' => ['integer'],
        ];
    }
}
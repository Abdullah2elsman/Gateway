<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'branch' => ['required', 'string', 'exists:gt_branches,district'],
            'full_name' => ['required', 'string', 'max:40'],
            'email' => ['required', 'email', 'unique:gt_users,email'],
            'phone_numbers.*' => ['required', 'regex:/[0-9]{10}/', 'numeric', 'unique:gt_usermeta,meta_value'],
            'country' => ['required', 'string'],
            'password' => ['required', 'string', 'same:confirm_password', 'min:8'],
            'confirm_password' => ['required', 'string', 'min:8'],
        ];
    }

    public function messages()
    {
        return [
            'phone_number.regex' => 'The phone number is invalid.'
        ];
    }
}
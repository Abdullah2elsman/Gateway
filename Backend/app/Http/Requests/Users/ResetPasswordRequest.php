<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'token' => ['required'],
            'password' => ['required_with:password_confirmation', 'string', 'same:password_confirmation', 'min:8'],
            'password_confirmation' =>  ['string', 'min:8'],
            'email' => ['required', 'email', 'exists:gt_usermeta,meta_value']
        ];
    }
}

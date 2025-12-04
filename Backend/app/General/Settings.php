<?php

namespace App\General;

use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Traits\SendNotification;
use App\Traits\StoreImageHelper;
use App\Traits\CreateGeneralMeta;
use App\Traits\UpdateGeneralMeta;
use Illuminate\Support\Facades\Gate;

class Settings
{
    use UpdateGeneralMeta, CreateGeneralMeta, StoreImageHelper, SendNotification;

    public function __construct(?GeneralMeta $general_meta)
    {
        Gate::authorize('updateSettings', $general_meta);

        $this->meta_keys = ['site_title', 'site_logo'];

        $this->current_user = auth()->user();
    }

    public function settings(?GeneralMeta $general_meta, Request $request)
    {
        try
        {
            $request->filled($this->meta_keys[0]) && ($general_meta->where('meta_key', $this->meta_keys[0])->exists() ?

            $this->UpdateMeta($this->meta_keys[0], $request->site_title)
            :
            $this->CreateMeta($this->meta_keys[0], $request->site_title));

            $request->file($this->meta_keys[1]) && ($general_meta->where('meta_key', $this->meta_keys[1])->exists() ?

            $this->UpdateMeta($this->meta_keys[1], $this->storeImage($request->file($this->meta_keys[1]), 'logo'))
            :
            $this->CreateMeta($this->meta_keys[1], $this->storeImage($request->file($this->meta_keys[1]), 'logo')));

            $this->notifyUser('has updated settings', $this->current_user, 'update_settings');

            return response(['message' => 'Settings updated successfully.'], 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The settings cannot be updated. Please contact the administrator of the website."], 400);
        }
    }
}
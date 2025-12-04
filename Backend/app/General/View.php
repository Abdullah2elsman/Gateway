<?php

namespace App\General;

use App\Models\GeneralMeta;
use App\Traits\GetGeneralMetaByKey;
use Illuminate\Support\Facades\Gate;

class View
{
    use GetGeneralMetaByKey;

    public function __construct(?GeneralMeta $general_meta)
    {
        $this->meta_keys = ['site_title', 'site_logo'];
    }

    public function view()
    {
        try
        {
            $meta_collection = [];

            foreach ($this->meta_keys as $meta)
            {
                $meta_collection[$meta] = $this->GetGeneralMeta($meta)?->meta_value;
            }

            return response($meta_collection, 200);
        }
        catch (Exception $e)
        {
            return response(['message' => "Something went wrong. The settings cannot be viewed. Please contact the administrator of the website."], 400);
        }
    }
}
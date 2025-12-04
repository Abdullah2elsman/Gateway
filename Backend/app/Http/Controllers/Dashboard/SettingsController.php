<?php

namespace App\Http\Controllers\Dashboard;

use App\General\View;
use App\General\Settings;
use App\Models\GeneralMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth('sanctum')->user();
    }

    public function view(?GeneralMeta $general_meta)
    {
        $this->settings['view'] = new View($general_meta);

        return $this->settings['view']->view();
    }

    public function update(?GeneralMeta $general_meta, Request $request)
    {
        $this->settings['update'] = new Settings($general_meta);

        return $this->settings['update']->settings($general_meta, $request);
    }
}
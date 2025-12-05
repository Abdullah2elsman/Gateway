<?php

namespace App\Traits;

use App\Models\GeneralMeta;

trait GetGeneralMeta
{
    /**
     * Get general meta by ID
     */
    protected function GetGeneralMeta($id)
    {
        if (!$id) {
            return null;
        }

        return GeneralMeta::where('id', $id)->first();
    }
}

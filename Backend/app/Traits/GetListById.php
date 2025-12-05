<?php

namespace App\Traits;

use App\Models\GtList;

trait GetListById
{
    /**
     * Get list by ID
     */
    protected function List($id)
    {
        if (!$id) {
            return null;
        }

        return GtList::where('id', $id)->first();
    }
}

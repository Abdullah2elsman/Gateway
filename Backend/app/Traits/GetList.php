<?php

namespace App\Traits;

use App\Models\GtList;

trait GetList
{
    protected function List($list_title)
    {
        return GtList::where('list_title', $list_title)->first();
    }
}
<?php

namespace App\Http\Controllers\Dashboard;

use App\General\Search;
use App\Models\Trainee;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\GlobalSearchRequest;

class GeneralController extends Controller
{
    public function search(?Trainee $trainee, ?TraineeMeta $trainee_meta, GlobalSearchRequest $request)
    {
        $search = new Search($trainee);

        return $search->search($trainee, $trainee_meta, $request);
    }
}

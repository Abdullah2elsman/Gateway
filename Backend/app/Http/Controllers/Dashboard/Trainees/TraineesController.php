<?php

namespace App\Http\Controllers\Dashboard\Trainees;

use App\Models\Trainee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\TraineesData\ViewTraineeData;
use App\TraineesData\ViewSingleTrainee;

class TraineesController extends Controller
{
    public function view(?Trainee $trainee, Request $request)
    {
        $this->trainees['view'] = new ViewTraineeData($trainee);

        return $this->trainees['view']->viewTraineeData($trainee, $request);
    }

    public function viewSingleTrainee(?Trainee $trainee, Request $request, $trainee_id)
    {
        $this->trainees['view-single'] = new ViewSingleTrainee($trainee);

        return $this->trainees['view-single']->viewSingleTraineeData($trainee, $request, $trainee_id);
    }
}

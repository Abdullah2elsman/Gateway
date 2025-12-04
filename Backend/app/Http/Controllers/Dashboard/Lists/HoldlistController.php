<?php

namespace App\Http\Controllers\Dashboard\Lists;

use App\Models\User;
use App\Models\Trainee;
use App\Models\Permission;
use App\Models\TraineeMeta;
use Illuminate\Http\Request;
use App\Trainees\Holdlist\View;
use App\Trainees\Holdlist\Update;
use App\Http\Controllers\Controller;
use App\Trainees\Holdlist\Show\Trainers;
use App\Trainees\Holdlist\Deletes\Delete;
use App\Trainees\Holdlist\Deletes\BulkDelete;
use App\Trainees\Holdlist\Move\HoldMoveToWait;
use App\Trainees\Holdlist\Move\Bulk\HoldToWait;

class HoldlistController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function bulkMoveToWait(?Trainee $trainee, Request $request)
    {
        $this->trainee['wait'] = new HoldToWait($this->current_user);

        return $this->trainee['wait']->move($trainee, $request);
    }

    public function moveToWait(?Trainee $trainee, $id)
    {
        $this->trainee['move-to-wait'] = new HoldMoveToWait($trainee, $id);

        return $this->trainee['move-to-wait']->move($trainee, $id);
    }
    
    public function viewTrainers(?Trainee $trainee, ?User $user, ?Permission $permission)
    {
        $this->trainee['trainers'] = new Trainers($trainee);

        return $this->trainee['trainers']->show($user, $permission);
    }

    public function view(?Trainee $trainee, Request $request)
    {
        $this->trainee['view'] = new View($this->current_user);

        return $this->trainee['view']->view($trainee, $request);
    }

    public function update(?Trainee $trainee, ?TraineeMeta $TraineeMeta, Request $request, $id)
    {
        $this->trainee['update'] = new Update($trainee, $this->current_user, $id);

        return $this->trainee['update']->update($trainee, $TraineeMeta, $request, $id);
    }
    
    public function delete(?Trainee $trainee, $id)
    {
        $this->trainee['delete'] = new Delete($trainee, $id);

        return $this->trainee['delete']->delete($trainee, $id);
    }

    public function bulkDelete(?Trainee $trainee, Request $request)
    {
        $this->trainee['delete'] = new BulkDelete();

        return $this->trainee['delete']->delete($trainee, $request);
    }
}
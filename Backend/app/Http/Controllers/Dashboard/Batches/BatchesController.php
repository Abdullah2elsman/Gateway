<?php

namespace App\Http\Controllers\Dashboard\Batches;

use App\Batches\View;
use App\Models\Batch;
use App\Batches\Create;
use App\Batches\Update;
use App\Models\Classes;
use App\Batches\Duplicate;
use App\Models\TraineeClass;
use Illuminate\Http\Request;
use App\Batches\Action\Delete;
use App\Batches\Action\EndBatch;
use App\Batches\View\FilterClasses;
use App\Http\Controllers\Controller;
use App\Batches\Action\ActivateBatch;

class BatchesController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth()->user();
    }

    public function activate(?Batch $batch, $id)
    {
        $this->batch['activate'] = new ActivateBatch($batch, $id);

        return $this->batch['activate']->activateBatch($batch, $id);
    }

    public function end(?Batch $batch, $id)
    {
        $this->batch['end'] = new EndBatch($batch, $id);

        return $this->batch['end']->endBatch($batch, $id);
    }

    public function duplicate(?Batch $batch, Request $request)
    {
        $this->batch['duplicate'] = new Duplicate($batch, $this->current_user);

        return $this->batch['duplicate']->duplicate($batch, $request);
    }

    public function filterClasses(?Classes $class, ?Batch $batch, Request $request, $batch_id)
    {
        $this->batch['filter-classes'] = new FilterClasses($this->current_user);

        return $this->batch['filter-classes']->getClasses($class, $batch, $request, $batch_id);
    }

    public function view(?Batch $batch, Request $request)
    {
        $this->batch['view'] = new View($this->current_user);

        return $this->batch['view']->view($batch, $request);
    }

    public function create(?Batch $batch, Request $request)
    {
        $this->batch['create'] = new Create($batch, $this->current_user);

        return $this->batch['create']->create($batch, $request);
    }

    public function update(?Batch $batch, Request $request, $id)
    {
        $this->batch['update'] = new Update($batch, $id);

        return $this->batch['update']->update($batch, $request, $id);
    }

    public function delete(?Batch $batch, $id)
    {
        $this->batch['delete'] = new Delete($batch, $id);

        return $this->batch['delete']->delete($batch, $id);
    }
}
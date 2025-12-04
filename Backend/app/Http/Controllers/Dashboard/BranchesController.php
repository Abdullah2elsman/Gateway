<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Http\Requests\BranchRequest;
use App\Http\Requests\BulkBranchRequest;
use App\Branches\Create;
use App\Branches\Update;
use App\Branches\ViewBranches;
use App\Branches\View;
use App\Branches\Deletes\Delete;
use App\Branches\Deletes\BulkDelete;

class BranchesController extends Controller
{
    public function __construct()
    {
        $this->current_user = auth('sanctum')->user();
    }

    public function view(?Branch $branch)
    {
        $this->branch['branch'] = new View($branch);

        return $this->branch['branch']->view($branch);
    }

    public function viewBranches(?Branch $branch)
    {
        $this->branch['branch'] = new ViewBranches();

        return $this->branch['branch']->view($branch);
    }

    public function create(?Branch $branch, BranchRequest $request)
    {
        $this->branch['create'] = new Create($branch);

        return $this->branch['create']->create($branch, $request);
    }

    public function update(?Branch $branch, BranchRequest $request, $id)
    {
        $this->branch['update'] = new Update($branch);

        return $this->branch['update']->update($branch, $request, $id);
    }

    public function delete(?Branch $branch, $id)
    {
        $this->branch['delete'] = new Delete($branch);

        return $this->branch['delete']->delete($branch, $id);
    }

    public function bulkDelete(?Branch $branch, BulkBranchRequest $request)
    {
        $this->branch['bulk-delete'] = new BulkDelete();

        return $this->branch['bulk-delete']->delete($branch, $request);
    }
}
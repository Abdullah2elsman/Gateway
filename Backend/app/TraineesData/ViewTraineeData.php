<?php

namespace App\TraineesData;

use Exception;
use App\Models\Trainee;
use App\Traits\GetUser;
use App\Traits\GetClass;
use App\Traits\GetListById;
use Illuminate\Http\Request;
use App\Traits\GetBranchByID;
use App\Traits\GetGeneralMeta;
use App\Traits\GetBranchByName;
use Illuminate\Support\Facades\Gate;
use App\Traits\CheckPermissionByBranch;
use Illuminate\Support\Facades\Cache;

class ViewTraineeData
{
    use GetUser, GetBranchByID, GetBranchByName, GetListById, GetClass, GetGeneralMeta, CheckPermissionByBranch;

    // inside cache to reduce queries
    protected $lists_cache = [];
    protected $classes_cache = [];
    protected $meta_cache = [];
    protected $general_meta_cache = [];

    public function __construct(?Trainee $trainee)
    {
        Gate::authorize('viewTrainees', $trainee);

        $this->permission_collection = 'pendingusers';
        $this->permission_keys = ['view_trainees'];
        $this->current_permission = 'view_trainees_by_branch';
        // Load role and branch relationships for admin check
        $this->current_user = auth()->user()->load(['role', 'branch']);
    }

    protected function getListCached($id)
    {
        if (!isset($this->lists_cache[$id])) {
            $this->lists_cache[$id] = $this->List($id);
        }
        return $this->lists_cache[$id];
    }

    // inside cache functions to reduce the repeated quires
    protected function getClassCached($id)
    {
        if (!isset($this->classes_cache[$id])) {
            $this->classes_cache[$id] = $this->getClass($id);
        }
        return $this->classes_cache[$id];
    }

    protected function getGeneralMetaCached($id)
    {
        if (!isset($this->general_meta_cache[$id])) {
            $this->general_meta_cache[$id] = $this->GetGeneralMeta($id);
        }
        return $this->general_meta_cache[$id];
    }

    public function viewTraineeData(?Trainee $trainee, Request $request)
    {
        try {
            // Load role and branch relationships for admin check (if not already loaded)
            if (!$this->current_user->relationLoaded('role')) {
                $this->current_user->load('role');
            }
            if (!$this->current_user->relationLoaded('branch')) {
                $this->current_user->load('branch');
            }

            // Check if user is admin
            $isAdmin = $this->current_user->role && strtolower(trim($this->current_user->role->role)) === 'admin';
            $adminCityFilter = '';

            if ($isAdmin && $this->current_user->branch) {
                $adminCity = strtolower(trim($this->current_user->branch->city));
                if ($adminCity === 'cairo') {
                    $adminCityFilter = '_admin_cairo_nasrcity';
                } elseif ($adminCity === 'giza') {
                    $adminCityFilter = '_admin_giza_dokki';
                }
            }

            // Build cache key based on user, page, branch filter, permissions, and admin status
            $branchFilter = $request->filled('branch') ? '_branch_' . $this->getBranchID($request) : '';
            $isBranchRestricted = $this->CheckPermissionByBranch(
                $this,
                $this->permission_collection,
                $this->current_permission,
                $this->permission_keys
            );
            $cacheKey = 'trainees_page_' . ($request->page ?? 1) . '_user_' . $this->current_user->id . $branchFilter . $adminCityFilter . '_' . ($isBranchRestricted && !$isAdmin ? 'restricted' : 'all');

            return Cache::remember($cacheKey, 300, function () use ($trainee, $request, $isBranchRestricted, $isAdmin) {
                // Pre-load all lists and general meta to avoid N+1 queries
                $allLists = Cache::remember('all_gt_lists', 3600, function () {
                    return \App\Models\GtList::pluck('list_title', 'id')->toArray();
                });

                $allGeneralMeta = Cache::remember('all_general_meta', 3600, function () {
                    return \App\Models\GeneralMeta::pluck('meta_value', 'id')->toArray();
                });

                // Get all follow_up user IDs that we'll need
                $query = $trainee->newQuery()
                    ->select([
                        'id',
                        'full_name',
                        'attend_type',
                        'test_date',
                        'branch_id',
                        'trainer_id',
                        'current_list',
                        'follow_up',
                        'payment_type'
                    ])
                    ->with([
                        'trainee_meta:trainee_id,meta_key,meta_value',
                        'user:id,full_name',
                        'branch:id,district,city',
                        'follow_up_user:id,full_name',
                        'list:id,list_title'
                    ])->orderBy('id', 'desc');

                // If current user is admin, apply city-based trainee filtering (this overrides branch restrictions)
                if ($isAdmin && $this->current_user->branch) {
                    $adminCity = strtolower(trim($this->current_user->branch->city));

                    if ($adminCity === 'cairo') {
                        // Admin from Cairo → show trainees whose branch district = Nasr City
                        $query->whereHas('branch', function ($q) {
                            $q->where('district', 'Nasr City');
                        });
                    } elseif ($adminCity === 'giza') {
                        // Admin from Giza → show trainees whose branch district = Dokki
                        $query->whereHas('branch', function ($q) {
                            $q->where('district', 'Dokki');
                        });
                    }
                } else {
                    // Apply permission-based filtering only if not admin
                    if ($isBranchRestricted) {
                        $query->where('branch_id', $this->current_user->branch_id);
                    } elseif ($request->filled('branch')) {
                        $query->where('branch_id', $this->getBranchID($request));
                    }
                }

                // Paginate results - always return 50 rows per page
                $trainees = $query->paginate(50);

                // Get all trainee IDs to batch load their classes
                $traineeIds = $trainees->pluck('id')->toArray();

                // Batch load all trainee classes with their class and batch info
                $traineeClassesMap = Cache::remember('trainee_classes_batch_' . md5(implode(',', $traineeIds)), 300, function () use ($traineeIds) {
                    $traineeClasses = \App\Models\TraineeClass::whereIn('trainee_id', $traineeIds)
                        ->with(['classes' => function ($q) {
                            $q->select('id', 'class_name', 'batch_id')
                                ->with(['batch' => function ($q) {
                                    $q->select('id', 'position');
                                }]);
                        }])
                        ->get()
                        ->groupBy('trainee_id');

                    $map = [];
                    foreach ($traineeClasses as $traineeId => $classes) {
                        // Get the class with the highest batch position
                        $latestClass = $classes->sortByDesc(function ($tc) {
                            return $tc->classes?->batch?->position ?? 0;
                        })->first();

                        if ($latestClass && $latestClass->classes) {
                            $map[$traineeId] = $latestClass->classes;
                        }
                    }
                    return $map;
                });

                $trainees_collection = [];

                foreach ($trainees as $key => $g_trainee) {
                    // Determine status (List or Class) - use eager loaded data first
                    if ($g_trainee->current_list) {
                        $status = $g_trainee->list?->list_title ?? ($allLists[$g_trainee->current_list] ?? null);
                    } else {
                        $status = $traineeClassesMap[$g_trainee->id]?->class_name ?? null;
                    }

                    // Follow-up data - use eager loaded relationship
                    $follow_up_collection = [];
                    if ($status === 'Pending List' && $g_trainee->follow_up_user) {
                        $follow_up_collection = ['follow_up' => $g_trainee->follow_up_user->full_name];
                    }

                    // Convert trainee_meta to simple array
                    $meta_collection = $g_trainee->trainee_meta
                        ->pluck('meta_value', 'meta_key')
                        ->toArray();

                    // Get payment type from cache
                    $paymentType = $g_trainee->payment_type
                        ? ($allGeneralMeta[$g_trainee->payment_type] ?? null)
                        : null;

                    // Build final result
                    $trainees_collection[$key] = [
                        'id' => $g_trainee->id,
                        'status' => $status,
                        'full_name' => $g_trainee->full_name,
                        'attend_type' => $g_trainee->attend_type,
                        'test_date' => $g_trainee->test_date,
                        'branch' => $g_trainee->branch?->district,
                        'trainer' => $g_trainee->user?->full_name,
                        'payment_type' => $paymentType,
                        ...$follow_up_collection,
                        ...$meta_collection,
                    ];
                }

                return response([
                    'data' => $trainees_collection,
                    'pagination' => [
                        'total' => $trainees->total(),
                        'per_page' => $trainees->perPage(),
                        'current_page' => $trainees->currentPage(),
                        'last_page' => $trainees->lastPage(),
                    ],
                ], 200);
            });
        } catch (Exception $e) {
            return response([
                'message' => 'Something went wrong. Trainees cannot be viewed. Please contact the administrator.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}

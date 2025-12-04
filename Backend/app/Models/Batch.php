<?php

namespace App\Models;

use App\Models\Classes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Batch extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_batches';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'branch_id',
        'batch_title',
        'start_date',
        'end_date',
        'is_active',
        'position'
    ];

    public function classes()
    {
        return $this->hasMany(Classes::class, 'batch_id', 'id');
    }
}
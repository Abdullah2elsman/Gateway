<?php

namespace App\Models;

use App\Models\Batch;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classes extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_classes';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'batch_id',
        'trainer_id',
        'class_name',
        'class_type',
        'gate',
        'time_slot',
        'level',
        'gate_url',
        'gate_password'
    ];

    public function batch()
    {
        return $this->belongsTo(Batch::class, 'batch_id', 'id');
    }
}
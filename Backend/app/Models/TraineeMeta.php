<?php

namespace App\Models;

use App\Models\Trainee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TraineeMeta extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_trainee_metas';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $fillable = [
        'trainee_id',
        'meta_key',
        'meta_value'
    ];

    public function trainees()
    {
        return $this->hasMany(Trainee::class, 'id', 'trainee_id'); 
    }
}

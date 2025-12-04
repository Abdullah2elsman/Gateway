<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassMeta extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_classmeta';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
     
    protected $fillable = [
        'class_id',
        'meta_key',
        'meta_value',
        'position'
    ];
}
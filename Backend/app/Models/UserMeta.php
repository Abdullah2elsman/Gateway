<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_usermeta';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
     
    protected $fillable = [
        'user_id',
        'meta_key',
        'meta_value'
    ];
}

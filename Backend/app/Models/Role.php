<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permission;

class Role extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_roles';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
     
    protected $fillable = [
        'role'
    ];

    public function permissions()
    {
        return $this->hasMany(Permission::class, 'role_id', 'id');
    }
}

<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SysNotification extends Model
{
    use HasFactory;

        // Table Name
        protected $table = 'gt_sys_notifications';
        // Primary Key
        public $primaryKey = 'id';
        // Timestamps
        public $timestamps = true;

        protected $fillable = [
            'user_id',
            'action',
        ];

        public function user()
        {
            return $this->belongsTo(User::class, 'user_id', 'id');
        }
}
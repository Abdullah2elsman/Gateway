<?php

namespace App\Models;

use App\Models\Classes;
use App\Models\Trainee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TraineeClass extends Model
{
    use HasFactory;

        // Table Name
        protected $table = 'gt_trainee_classes';
        // Primary Key
        public $primaryKey = 'id';
        // Timestamps
        public $timestamps = true;
    
        protected $fillable = [
            'user_id',
            'class_id',
            'trainee_id',
            'confirmation'
        ];
    
        public function trainees()
        {
                return $this->hasMany(Trainee::class, 'id', 'trainee_id');
        }

        public function classes()
        {
            return $this->belongsTo(Classes::class, 'class_id', 'id');
        }
}
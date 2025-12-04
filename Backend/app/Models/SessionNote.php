<?php

namespace App\Models;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SessionNote extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_session_notes';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
     
    protected $fillable = [
        'attend_id',
        'session_title',
        'session_status'  
    ];

    public function attendance()
    {
        return $this->belongsTo(Attendance::class, 'attend_id', 'id');
    }
}
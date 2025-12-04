<?php

namespace App\Models;

use App\Models\Annoncement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnnoncementReply extends Model
{
    use HasFactory;
    
    // Table Name
    protected $table = 'gt_annoncement_replies';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
     
    protected $fillable = [
        'user_id',
        'announce_id',
        'reply'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function announcement()
    {
        return $this->belongsTo(Annoncement::class, 'announce_id', 'id');
    }
}
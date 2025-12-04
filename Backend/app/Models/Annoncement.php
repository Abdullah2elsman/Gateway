<?php

namespace App\Models;

use App\Models\AnnoncementReply;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Annoncement extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'gt_annoncements';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'announce'
    ];

    public function replies()
    {
        return $this->hasMany(AnnoncementReply::class, 'announce_id', 'id')->orderBy('created_at', 'desc');
    }
}
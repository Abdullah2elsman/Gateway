<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralMeta extends Model
{
    use HasFactory;

       // Table Name
       protected $table = 'gt_generalmeta';
       // Primary Key
       public $primaryKey = 'id';
       // Timestamps
       public $timestamps = true;
        
       protected $fillable = [
           'meta_key',
           'meta_value'
       ];
}

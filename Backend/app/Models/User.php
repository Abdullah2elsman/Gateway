<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Branch;
use App\Models\UserMeta;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Table Name
    protected $table = 'gt_users';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $fillable = [
        'branch_id',
        'role_id',
        'full_name',
        'email',
        'password',
        'is_activated'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    public function user_meta()
    {
        return $this->hasMany(UserMeta::class, 'user_id', 'id');
    }

    public function routeNotificationForMail(Notification $notification): array|string|null
    {
        return $this->user_meta()->where('meta_key', 'personal_email')->first()?->meta_value;
    }
}

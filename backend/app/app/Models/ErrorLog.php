<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ErrorLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_address',
        'level',
        'message',
        'stack',
        'additional_info',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id', 
        'user_id',
    ];

    /**
     * Get the user who liked the article.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the article that was liked.
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}

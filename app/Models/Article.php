<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'slug',
        'image_path',
        'user_id',
        'category_id',
        'status',
        'is_featured'
    ];

    public function isLikedBy(User $user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }


    public static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            $article->slug = Str::slug($article->title);
        });
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

    public function tags() 
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments() 
    {
        return $this->hasMany(Comment::class);
    }

    public function likes() 
    {
        return $this->hasMany(Like::class);
    }
}

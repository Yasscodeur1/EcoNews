<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Comment
 *
 * Représente un commentaire laissé par un utilisateur sur un article.
 *
 * @property int $id
 * @property string $content
 * @property bool $is_approved
 * @property int $article_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property \App\Models\User $user
 * @property \App\Models\Article $article
 */
class Comment extends Model
{
    use HasFactory;

    /**
     * Les attributs assignables en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'content',
        'is_approved',
        'article_id', 
        'user_id',
    ];

    /**
     * L'utilisateur qui a posté le commentaire.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * L'article concerné par le commentaire.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}

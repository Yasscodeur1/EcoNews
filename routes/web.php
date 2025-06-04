<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagleController;
use App\Http\Controllers\UserleController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'role:lecteur'])->group(function () {
    // Routes accessibles aux lecteurs : lire, commenter, liker
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::post('/articles/{article}/comment', [CommentController::class, 'store']);
    Route::post('/articles/{article}/like', [LikeController::class, 'store']);
});

Route::middleware(['auth', 'role:auteur'])->group(function () {
    // L’auteur peut créer/éditer/supprimer ses propres articles (contrôle dans le contrôleur)
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
});

Route::middleware(['auth', 'role:webmaster'])->group(function () {
    // Le webmaster gère tout : articles, catégories, tags, newsletters...
    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::post('/newsletters/send', [NewsletterController::class, 'send']);
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::get('/stats', [StatsController::class, 'index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';








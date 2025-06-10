<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\HomeController;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/logout', function () {
    auth()->logout();
    return redirect('/login');
})->middleware('auth');



Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::middleware('auth')->group(function () {
    Route::post('/likes/{article}', [LikeController::class, 'toggle'])->name('likes.toggle');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');


Route::middleware(['auth', 'role:lecteur'])->group(function () {
    // Routes accessibles aux lecteurs : lire, commenter, liker
    Route::post('/articles/{article}/comment', [CommentController::class, 'store']);
    Route::post('/articles/{article}/like', [LikeController::class, 'store']);
});

Route::middleware(['auth', 'role:auteur,webmaster,admin'])->group(function () {
    // L’auteur peut créer/éditer/supprimer ses propres articles (contrôle dans le contrôleur)
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
});

Route::get('/articles/{slug}', [ArticleController::class, 'show'])->name('articles.show');


Route::middleware(['auth', 'role:webmaster'])->group(function () {
    // Le webmaster gère tout : articles, catégories, tags, newsletters...
    Route::resource('articles', ArticleController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::post('/newsletters/send', [NewsletterController::class, 'send']);
});



Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
Route::post('/users', [UserController::class, 'store'])->name('users.store');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', function () {
        // $user = auth()->user();
        // dd($user->roles);
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('users', UserController::class)->except(['store', 'create']);
    Route::resource('roles', RoleController::class);
    Route::get('/stats', [StatsController::class, 'index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';








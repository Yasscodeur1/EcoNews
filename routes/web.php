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

Route::resource('comments', CommentController::class);
Route::resource('likes', LikeController::class);
Route::resource('roles', RoleController::class);
Route::resource('tags', TagleController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('articles', ArticleController::class);
    Route::resource('users', UserController::class)->except('show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

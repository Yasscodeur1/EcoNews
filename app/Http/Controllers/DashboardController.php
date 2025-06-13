<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Tag;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (!$user->hasRole('admin')) {
            abort(403); // ou redirect()->route('home');
        }
        return Inertia::render('dashboard', [
            'stats' => [
                'articles' => Article::count(),
                'users' => User::count(),
                'comments' => Comment::count(),
                'likes' => Like::count(),
                'tags' => Tag::count(),
            ],
        ]);
    }
}

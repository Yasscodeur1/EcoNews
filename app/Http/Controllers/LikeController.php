<?php

namespace App\Http\Controllers;


use App\Models\Like;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class LikeController extends Controller
{
    public function toggle(Article $article)
    {
        $user = Auth::user();
        // $article = Article::with(['likes.user'])->findOrFail($id);


        // Vérifie si l'utilisateur a déjà liké
        $like = $article->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete(); // retire le like
        } else {
            $article->likes()->create([
                'user_id' => $user->id,
            ]);
        }

        return back(); 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}

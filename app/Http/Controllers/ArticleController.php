<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();

        return inertia::render('articles/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'content' => 'required|string',
            'image_path' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
            'is_featured' => 'nullable|boolean',
        ]);
        $article = Article::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'content' => $request->content,
            'image_path' => $request->image_path,
            'status' => $request->status,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Article created successfully.',
            'article' => $article,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return Inertia::render('articles/show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $article = Article::findOrFail($id);

        if (auth()->user()->role->name === 'auteur' && $article->user_id !== auth()->id()) {
            abort(403, "Tu ne peux modifier que tes propres articles.");
        }

        // sinon afficher la vue d'édition
        return Inertia::render('articles/edit', compact('article'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $article = Article::findOrFail($id);

        if (auth()->user()->role->name === 'auteur' && $article->user_id !== auth()->id()) {
            abort(403, "Tu ne peux modifier que tes propres articles.");
        }

        // valider et mettre à jour
        $article->update($request->all());

        return redirect()->route('articles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article = Article::findOrFail($id);

        if (auth()->user()->role->name === 'auteur' && $article->user_id !== auth()->id()) {
            abort(403, "Tu ne peux supprimer que tes propres articles.");
        }

        $article->delete();

        return redirect()->route('articles.index');
    }
}

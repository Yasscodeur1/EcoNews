<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;



class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('articles/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articles = Article::with(['category', 'likes', 'comments.user'])->get();
        $categories = Category::all();
        return Inertia::render('articles/create', [
            'articles' => $articles,
            'categories' => Category::all(),
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
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
            'status' => 'required|in:draft,published',
            'category_id' => 'required|exists:categories,id',
            'is_featured' => 'nullable|boolean',
        ]);
        $article = Article::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'content' => $request->content,
            'image_path' => $request->image_path,
            'status' => $request->status,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured ?? false,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('articles.index')->with('success', 'Article créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $article = Article::with(['category', 'tags', 'user', 'likes', 'comments.user'])->where('slug', $slug)->firstOrFail();

        return Inertia::render('articles/show', [
            'article' => $article,
        ]);
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
        // $article = Article::findOrFail($id);

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

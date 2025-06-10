<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('categories/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Juste un exemple si tu veux passer des catégories existantes
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('categories/create', [
            'categories' => $categories,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
        ]);

        $slug = $validated['slug'] ?? Str::slug($validated['name']);

        Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'icon' => $validated['icon'] ?? null,
        ]);

        return redirect()->route('categories.index')->with('success', 'Catégorie créée avec succès.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}

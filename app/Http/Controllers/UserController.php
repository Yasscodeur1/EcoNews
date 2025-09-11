<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return inertia::render('users/index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'avatar' => 'nullable|string|url',
            'bio' => 'nullable|string|max:500',
            'role_id' => 'required|exists:roles,id',
            'password' => 'required|string|confirmed|min:8',
        ]);

        // Forcer is_admin = false si l'utilisateur courant n'est pas super admin
        if (!$user->is_super_admin) {
            $request->merge(['is_admin' => false]);
        } else {
            // Pour toi, super admin, on peut garder ce que tu passes, mais valider quand même
            $request->validate([
                'is_admin' => 'boolean',
            ]);
        }

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'avatar' => $validated['avatar'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'role_id' => $validated['role_id'],
            'password' => bcrypt($validated['password']),
            'is_admin' => $request->input('is_admin', false),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

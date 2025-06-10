<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
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
        $availableRoles = Role::all(['id', 'name']);
        return Inertia::render('users/create', compact('availableRoles'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string',
            'password' => 'required|string|confirmed|min:8',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
            'is_admin' => 'sometimes|boolean',
        ]);

        // Empêche les rôles interdits
        $forbiddenRoles = Role::whereIn('name', ['admin', 'webmaster'])->pluck('id')->toArray();
        
        // Récupère les rôles autorisés (lecteur, auteur)
        $availableRoles = Role::whereIn('name', ['lecteur', 'auteur'])->pluck('id')->toArray();

        // Assure que roles est un tableau
        if (!isset($validated['roles']) || !is_array($validated['roles'])) {
            $validated['roles'] = [];
        }

        // Ne garde que les rôles autorisés
        $selectedRoles = array_intersect($validated['roles'], $availableRoles);

        // Si aucun rôle valide → assigner "lecteur"
        if (empty($selectedRoles)) {
            $lecteurRoleId = Role::where('name', 'lecteur')->value('id');
            $selectedRoles = [$lecteurRoleId];
        }

        $currentUser = auth()->user();

        // Si pas admin, ne peut pas créer un admin
        if (!$currentUser || !$currentUser->is_admin) {
            $validated['is_admin'] = false;
        } else {
            $validated['is_admin'] = $validated['is_admin'] ?? false;
        }

        // Empêche la création d'un second admin
        if ($validated['is_admin']) {
            $existingAdmin = User::where('is_admin', true)->first();
            if ($existingAdmin) {
                return redirect()->back()
                    ->withErrors(['is_admin' => 'Un administrateur existe déjà.'])
                    ->withInput();
            }
        }

        // Création de l'utilisateur
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'avatar' => $validated['avatar'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'password' => bcrypt($validated['password']),
            'is_admin' => $validated['is_admin'],
        ]);

        // Attribution des rôles
        $user->roles()->sync($selectedRoles);

        return redirect()->route('login')->with('success', 'Compte créé avec succès. Vous pouvez maintenant vous connecter.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);

        foreach ($user->roles as $role) {
            echo $role->name . '<br>';
        }

        // Ou passer les rôles à une vue
        return Inertia::render('users/show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('roles/edit', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
        ]);

        $role->update(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Rôle mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role->delete();

        if ($role->users()->exists()) {
            return redirect()->back()->withErrors(['error' => 'Impossible de supprimer un rôle attribué à des utilisateurs.']);
        }

        return redirect()->route('roles.index')->with('success', 'Rôle supprimé avec succès.');
    }
}

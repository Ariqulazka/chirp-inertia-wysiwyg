<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UserController extends Controller

{

    public function index()

    {

        $users = User::withCount('chirps')->get();
        return Inertia::render('Users/Index', ['users' => $users]);

    }


    public function deactivate(User $user)

    {

        $user->update(['is_active' => false]);
        return redirect()->route('users.index');

    }


    public function destroy(User $user)

    {

        $user->delete();
        return redirect()->route('users.index');

    }


    public function promote(User $user)

    {

        $user->update(['role' => 'moderator']);

        return redirect()->route('users.index');

    }

}

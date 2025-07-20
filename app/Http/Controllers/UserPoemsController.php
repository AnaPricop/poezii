<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPoemsController extends Controller
{
    public function index()
    {
        $poems = Poem::where('user_id', auth()->id())
            ->with('user:id,name') // <-- ADAUGĂ ACEASTĂ LINIE
            ->withCount('likes')
            ->latest()
            ->get();

        return Inertia::render('MyPoems/Index', [
            'poems' => $poems,
        ]);
    }
}

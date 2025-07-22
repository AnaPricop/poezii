<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserPoemsController extends Controller
{
    public function index()
    {
        $poems = Poem::where('user_id', auth()->id())
            ->with('user:id,name')
            ->withCount('likes')
            ->latest()
            ->get();

        $likedPoemIds = Auth::user()->likes()->pluck('poem_id')->toArray();

        $poems->each(function ($poem) use ($likedPoemIds) {
            $poem->user_has_liked = in_array($poem->id, $likedPoemIds);
        });

        return Inertia::render('MyPoems/Index', [
            'poems' => $poems,
        ]);
    }
}

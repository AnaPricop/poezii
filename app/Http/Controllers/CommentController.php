<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Poem $poem)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2500',
        ]);

        $poem->comments()->create([
            'user_id' => auth()->id(),
            'body' => $validated['body'],
        ]);

        return back()->with('message', 'Comentariul a fost adăugat!');
    }
}

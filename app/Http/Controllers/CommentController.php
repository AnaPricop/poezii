<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;
use App\Notifications\NewCommentOnPoem;
class CommentController extends Controller
{
    public function store(Request $request, Poem $poem)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2500',
        ]);

        $comment = $poem->comments()->create([
            'user_id' => auth()->id(),
            'body' => $validated['body'],
        ]);
        if ($poem->user_id !== auth()->id()) {
            $poem->user->notify(new NewCommentOnPoem(auth()->user(), $poem, $comment));
        }
        return back()->with('message', 'Comentariul a fost adăugat!');
    }
}

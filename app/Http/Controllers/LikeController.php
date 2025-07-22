<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Poem $poem)
    {
        $like = $poem->likes()->where('user_id', auth()->id())->first();

        if ($like) {
            $like->delete();
        } else {

            $poem->likes()->create(['user_id' => auth()->id()]);
        }

        return back();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class PoemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $poems = Poem::with('user:id,name')->withCount('likes')->latest()->paginate(15);

        if (Auth::check()) {
            $likedPoemIds = Auth::user()->likes()->pluck('poem_id')->toArray();

            $poems->each(function ($poem) use ($likedPoemIds) {
                $poem->user_has_liked = in_array($poem->id, $likedPoemIds);
            });
        }

        return Inertia::render('Poems/Index', [
            'poems' => $poems,
        ]);
    }

    /**
     * Afișează pagina publică pentru o singură poezie.
     */
    public function show(Poem $poem): Response
    {
//        return Inertia::render('Poems/Show', [
//            'poem' => $poem->load('user:id,name')
//        ]);
        $poem->loadCount('likes');
        $poem->load('user:id,name');

        $comments = $poem->comments()->with('user:id,name')->latest()->get();

        return Inertia::render('Poems/Show', [
            'poem' => $poem,
            'comments' => $comments,
        ]);
    }

    /**
     * Afișează formularul de creare (pagină protejată).
     */
    public function create(): Response
    {
        return Inertia::render('Poems/Create');
    }

    /**
     * Salvează o poezie nouă în baza de date (acțiune protejată).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'type' => 'required|string|in:poezie,proză,eseu,scenariu,citate,personale',
            'content' => 'required|string',
        ]);

        $request->user()->poems()->create($validated);

        return redirect(route('dashboard'))->with('message', 'Creația a fost publicată cu succes!');
    }
}

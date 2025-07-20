<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PoemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Poems/Index', [
            // AICI ESTE CHEIA: încarcă TOATE poeziile, cu autor și paginare
            'poems' => \App\Models\Poem::with('user:id,name')
                ->latest()
                ->paginate(15) // Afișăm 15 pe pagină
        ]);
    }

    /**
     * Afișează pagina publică pentru o singură poezie.
     */
    public function show(Poem $poem): Response
    {
        // Încărcăm numărul de vizualizări sau alte detalii dacă e nevoie
        return Inertia::render('Poems/Show', [
            'poem' => $poem->load('user:id,name')
        ]);
    }

    /**
     * Afișează formularul de creare (pagină protejată).
     */
    public function create(): Response
    {
        // return response('Test from PoemController create method');
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

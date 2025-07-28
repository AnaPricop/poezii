<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth; // <-- Adaugă acest import

class DashboardController extends Controller
{
    public function index()
    {
        $poemsQuery = Poem::with('user:id,name')->withCount('likes', 'comments');

        $mostLikedPoems = (clone $poemsQuery)->orderByDesc('likes_count')->limit(5)->get();
        $latestPoems = (clone $poemsQuery)->latest()->limit(5)->get();

        if (Auth::check()) {
            // Preluăm ID-urile poeziilor la care userul curent a dat like
            $likedPoemIds = Auth::user()->likes()->pluck('poem_id')->toArray();

            $allPoemsOnPage = $mostLikedPoems->merge($latestPoems)->unique('id');

            $allPoemsOnPage->each(function ($poem) use ($likedPoemIds) {
                $poem->user_has_liked = in_array($poem->id, $likedPoemIds);
            });
        }

        return Inertia::render('Dashboard', [
            'mostLikedPoems' => $mostLikedPoems,
            'latestPoems' => $latestPoems,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}

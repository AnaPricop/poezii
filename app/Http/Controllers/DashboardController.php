<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route; // Adaugă acest import sus
use Illuminate\Foundation\Application;
class DashboardController extends Controller
{
    public function index()
    {
        $poems = Poem::with('user')->withCount('likes');

        $mostLikedPoems = (clone $poems)->orderByDesc('likes_count')->limit(5)->get();

        $latestPoems = (clone $poems)->latest()->limit(5)->get();

        return Inertia::render('Dashboard', [
            'mostLikedPoems' => $mostLikedPoems,
            'latestPoems' => $latestPoems,
            // Adaugă aceste linii, la fel ca în pagina Welcome standard
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}

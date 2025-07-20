<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserPoemsController;
use Illuminate\Support\Facades\Route;


Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/poezii', [PoemController::class, 'index'])->name('poems.index');

Route::get('/poezii/{poem}', [PoemController::class, 'show'])->name('poems.show');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/creatiile-mele', [UserPoemsController::class, 'index'])->name('my-poems.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('poems', PoemController::class)->except(['index', 'show']);

});

require __DIR__ . '/auth.php';

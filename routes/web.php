<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserPoemsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/poezii', [PoemController::class, 'index'])->name('poems.index');

Route::get('/poezii/{poem}', [PoemController::class, 'show'])->name('poems.show');


//Route::middleware(['auth', 'verified'])->group(function () {
Route::middleware(['auth'])->group(function () {
    Route::get('/creatiile-mele', [UserPoemsController::class, 'index'])->name('my-poems.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/poems/{poem}/like', [LikeController::class, 'toggle'])->name('poems.like');
    Route::post('/poems/{poem}/comments', [CommentController::class, 'store'])->name('poems.comments.store');


    Route::resource('poems', PoemController::class)->except(['index', 'show']);
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
});

require __DIR__ . '/auth.php';

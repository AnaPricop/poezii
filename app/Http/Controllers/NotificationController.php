<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAsRead(Request $request)
    {
        $request->validate(['ids' => 'required|array']);

        $request->user()->unreadNotifications()
            ->whereIn('id', $request->ids)
            ->update(['read_at' => now()]);


        return back();

    }
}

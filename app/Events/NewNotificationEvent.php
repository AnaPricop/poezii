<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
class NewNotificationEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private array $notificationData;
    private User $user;

    /**
     * Create a new event instance.
     */
    public function __construct(array $notificationData, User $user)
    {
        $this->notificationData = $notificationData;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Trimitem evenimentul pe un canal privat, specific user-ului
        return [
            new PrivateChannel('notifications.' . $this->user->id),
        ];
    }

    public function broadcastWith(): array
    {
        return $this->notificationData;
    }
}

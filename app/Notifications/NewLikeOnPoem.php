<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\User;
use App\Models\Poem;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

use App\Events\NewNotificationEvent;
class NewLikeOnPoem extends Notification implements ShouldBroadcast
{
    use Queueable;

    public User $liker;
    public Poem $poem;
    public function __construct(User $liker, Poem $poem)
    {
        $this->liker = $liker;
        $this->poem = $poem;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        //return ['mail'];
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'liker_id' => $this->liker->id,
            'liker_name' => $this->liker->name,
            'poem_id' => $this->poem->id,
            'poem_title' => $this->poem->title,
            'message' => "{$this->liker->name} ți-a apreciat poezia: \"{$this->poem->title}\"",
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {

//        return new BroadcastMessage($this->toArray($notifiable));
        $data = $this->toArray($notifiable);
        $data['id'] = $this->id;
        return new BroadcastMessage($data);
    }
}

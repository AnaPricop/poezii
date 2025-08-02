<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Poem;
use App\Models\Comment;

class NewCommentOnPoem extends Notification implements ShouldBroadcastNow
{

    public User $commenter;
    public Poem $poem;
    public Comment $comment;

    public function __construct(User $commenter, Poem $poem, Comment $comment)
    {
        $this->commenter = $commenter;
        $this->poem = $poem;
        $this->comment = $comment;
    }

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'commenter_id' => $this->commenter->id,
            'commenter_name' => $this->commenter->name,
            'poem_id' => $this->poem->id,
            'poem_title' => $this->poem->title,
            'comment_id' => $this->comment->id,
            'message' => "{$this->commenter->name} a comentat la poezia ta: \"{$this->poem->title}\"",
        ];
    }

    /**
     * Get the broadcast representation of the notification.
     *
     * @return \Illuminate\Notifications\Messages\BroadcastMessage
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        $data = $this->toArray($notifiable);
        $data['id'] = $this->id;
        return new BroadcastMessage($data);
    }
}

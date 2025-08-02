import React from 'react';
import Dropdown from '@/Components/Dropdown';
import { usePage, Link } from '@inertiajs/react';
import { useEffect, useState  } from 'react';
import { router } from '@inertiajs/core';
const BellIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const NotificationItem = ({ notification }) => {
    // Extragem datele pentru a fi mai lizibil
    const { liker_name, commenter_name, message, poem_id } = notification.data;
    const actorName = liker_name || commenter_name;

    return (
        <Dropdown.Link
            href={route('poems.show', poem_id)}
            className="border-t border-slate-100 !block"
        >
            <div className="flex items-start space-x-3 px-4 py-3">

                <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-text-muted font-semibold text-sm">
                    {actorName ? actorName.charAt(0) : '?'}
                </div>

                <div className="text-sm">
                    <p className="text-text-main whitespace-normal">{message}</p>

                </div>
            </div>
        </Dropdown.Link>
    );
};


export default function NotificationsDropdown() {
    const { auth } = usePage().props;
    // const unreadNotifications = auth.unreadNotifications || [];
    const [notifications, setNotifications] = useState(auth.unreadNotifications || []);

    useEffect(() => {
        if (auth.user) {
            const channel = window.Echo.private(`App.Models.User.${auth.user.id}`);

            channel.notification((notification) => {
                // Creează un obiect nou, consistent
                const newNotification = {
                    id: notification.id,
                    data: notification,
                };


                setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
            });

            return () => {
                window.Echo.leaveChannel(`App.Models.User.${auth.user.id}`);
            };
        }
    }, [auth.user]);

    const handleDropdownToggle = (isOpen) => {
        if (isOpen && notifications.length > 0) {
            const unreadIds = notifications.map(n => n.id);

            router.post(route('notifications.read'), { ids: unreadIds }, {
                preserveScroll: true,
                // onSuccess: () => setNotifications([]),
            });
        }
    };
    return (
        <div className="relative ms-3">
            <Dropdown onToggle={handleDropdownToggle}>
                <Dropdown.Trigger>
                    <button className="relative p-2 rounded-full text-text-muted hover:text-text-main focus:outline-none transition-colors duration-200">
                        <BellIcon />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-surface"></span>
                        )}
                    </button>
                </Dropdown.Trigger>

                <Dropdown.Content align="right" width="w-96">
                    <div className="flex justify-between items-center p-4 font-bold text-text-main border-b border-slate-200">
                        <span>Notificări</span>

                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))
                        ) : (
                            <div className="p-6 text-sm text-center text-text-muted">
                                Nu ai notificări noi.
                            </div>
                        )}
                    </div>
                    <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
                        <Link href="#" className="text-sm font-semibold text-primary hover:underline">
                            Vezi toate notificările
                        </Link>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

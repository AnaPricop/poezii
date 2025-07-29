import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Poem({ poem }) {
    const { auth } = usePage().props;

    return (
        <div className="p-6">
            <div className="flex space-x-2">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-text-main">{poem.user?.name}</span>
                            <small className="ml-2 text-sm text-text-muted">{new Date(poem.created_at).toLocaleString()}</small>
                        </div>
                    </div>
                    <Link href={route('poems.show', poem.id)}>
                        <h3 className="mt-2 text-lg font-semibold text-text-main hover:text-primary transition-colors duration-200 cursor-pointer">
                            {poem.title}
                        </h3>
                    </Link>
                    <p className="mt-2 text-md text-text-main whitespace-pre-wrap">{poem.content}</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-text-muted">
                <div className="flex items-center space-x-4">
                    <span>{poem.likes_count} {poem.likes_count === 1 ? 'apreciere' : 'aprecieri'}</span>
                    <Link href={route('poems.show', poem.id)} className="hover:underline">
                        <span>{poem.comments_count} {poem.comments_count === 1 ? 'comentariu' : 'comentarii'}</span>
                    </Link>
                </div>

                {auth.user && (
                    <Link
                        href={route('poems.like', poem.id)}
                        method="post"
                        as="button"
                        preserveScroll
                        preserveState
                        className={`p-2 rounded-lg flex items-center space-x-2 text-sm font-semibold transition-colors duration-200 ${
                            poem.user_has_liked
                                ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                                : 'text-primary bg-teal-50 hover:bg-teal-100'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>

                        <span>{poem.user_has_liked ? 'Apreciat' : 'Apreciază'}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

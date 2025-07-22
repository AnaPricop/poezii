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
                            <span className="text-gray-800">{poem.user?.name}</span>
                            <small className="ml-2 text-sm text-gray-600">{new Date(poem.created_at).toLocaleString()}</small>
                        </div>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-900">{poem.title}</p>
                    <p className="mt-2 text-md text-gray-700 whitespace-pre-wrap">{poem.content}</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span>{poem.likes_count} aprecieri</span>

                {auth.user && (
                    <Link
                        href={route('poems.like', poem.id)}
                        method="post"
                        as="button"
                        preserveScroll
                        preserveState
                        className={`p-2 rounded-full flex items-center space-x-1 transition-colors duration-200 ${
                            poem.user_has_liked
                                ? 'text-red-500 bg-red-100 hover:bg-red-200'
                                : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
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

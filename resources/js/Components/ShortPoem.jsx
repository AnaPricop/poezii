import React from 'react';
import {Link, usePage} from '@inertiajs/react';

export default function ShortPoem({poem}) {
    const {auth} = usePage().props;

    return (
        <div className="p-6">
            <div className="flex space-x-2">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-gray-800">{poem.user?.name}</span>
                            <small
                                className="ml-2 text-sm text-gray-600">{new Date(poem.created_at).toLocaleString()}</small>
                        </div>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-900">{poem.title}</p>
                    <div className="flex mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 ml-2" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                  clipRule="evenodd"/>
                        </svg>
                        <span>{poem.likes_count} aprecieri</span>
                        <span className="text-gray-300">•</span>
                        <svg viewBox="0 0 16 16" className="h-4 w-4 mr-2 ml-2" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#444"
                                      d="M16 11.1c0-1.5-1.5-2.8-3.2-3.3-1.3 1.5-3.9 2.4-6.4 2.4-0.1 0-0.3 0-0.4 0 0 0 0 0-0.1 0-0.1 0.3-0.1 0.5-0.1 0.8 0 2 2.2 3.6 5 3.6 0.2 0 0.4 0 0.6 0 0.4 0.5 1.7 1.4 3.4 1.4 0 0-0.8-0.4-0.8-1.8 0 0 0 0 0 0 0-0.6 2-1.8 2-3.1z"></path>
                                <path fill="#444"
                                      d="M13 4.6c0-2.5-2.8-4.6-6.4-4.6s-6.6 2.1-6.6 4.6c0 1.7 2 3.2 3 4 0 0 0 0 0 0 0 1.8-1.4 2.4-1.4 2.4 2.3 0 3.6-1.1 4.2-1.8 0.2 0 0.5 0 0.8 0 3.5 0.1 6.4-2 6.4-4.6z"></path>
                            </g>
                        </svg>
                        <span>{poem.comments_count} comentarii</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

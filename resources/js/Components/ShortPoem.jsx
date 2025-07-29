import React from 'react';
import { Link } from '@inertiajs/react';

// Iconițe SVG simple pentru a le avea local
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const CommentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);

export default function ShortPoem({ poem }) {
    return (
        // Am adăugat o tranziție subtilă la hover pe întregul card
        <div className="p-6 hover:bg-slate-50 transition-colors duration-200">
            <div className="flex-1">
                {/* Informații autor și dată */}
                <div className="flex justify-between items-center text-sm text-text-muted">
                    <span>de {poem.user?.name}</span>
                    <span>{new Date(poem.created_at).toLocaleDateString()}</span>
                </div>

                <Link href={route('poems.show', poem.id)}>
                    <h3 className="mt-2 text-lg font-semibold text-text-main hover:text-primary transition-colors duration-200 cursor-pointer">
                        {poem.title}
                    </h3>
                </Link>

                {/* Statistici - Aprecieri și Comentarii */}
                <div className="mt-4 flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                        <HeartIcon />
                        <span>{poem.likes_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <CommentIcon />
                        <span>{poem.comments_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

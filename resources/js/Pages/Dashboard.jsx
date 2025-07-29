import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import ShortPoem from '@/Components/ShortPoem';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ mostLikedPoems, latestPoems }) {
    const { auth } = usePage().props;

    const PoemSection = ({ title, poems = [] }) => (
        <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-text-main px-2">{title}</h2>
            {poems.length > 0 ? (
                <div className="bg-surface rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
                    {poems.map(poem => (
                        <ShortPoem key={poem.id} poem={poem} />
                    ))}
                </div>
            ) : (
                <div className="bg-surface rounded-lg p-6 text-center text-text-muted">
                    <p>Nu există poezii în această secțiune.</p>
                </div>
            )}
        </div>
    );

    const pageContent = (
        <>
            <Head title="Bun Venit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 space-y-12 lg:space-y-0">
                        <PoemSection title="Cele mai apreciate creații" poems={mostLikedPoems} />
                        <PoemSection title="Adăugate recent" poems={latestPoems} />
                    </div>
                </div>
            </div>
        </>
    );

    if (auth.user) {
        return <AuthenticatedLayout>{pageContent}</AuthenticatedLayout>;
    }
    return <GuestLayout>{pageContent}</GuestLayout>;
}

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Poem from '@/Components/Poem';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ mostLikedPoems, latestPoems }) {
    const { auth } = usePage().props;

    const PoemSection = ({ title, poems }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            {poems.length > 0 ? (
                <div className="bg-white shadow-sm rounded-lg divide-y">
                    {poems.map(poem => (
                        <Poem key={poem.id} poem={poem} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Nu există poezii în această secțiune.</p>
            )}
        </div>
    );

    const pageContent = (
        <>
            <Head title="Bun Venit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PoemSection title="Cele mai apreciate creații" poems={mostLikedPoems} />
                    <PoemSection title="Adăugate recent" poems={latestPoems} />
                </div>
            </div>
        </>
    );

    if (auth.user) {
        return (
            <AuthenticatedLayout>
                {pageContent}
            </AuthenticatedLayout>
        );
    }

    return (
        <GuestLayout>
            {pageContent}
        </GuestLayout>
    );
}

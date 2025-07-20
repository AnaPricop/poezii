import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Poem from '@/Components/Poem';
import { Head } from '@inertiajs/react';

export default function Index({ auth, poems }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Poezii" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {poems.data.map(poem =>
                        <Poem key={poem.id} poem={poem} />
                    )}
                </div>
                {/* Aici poți adăuga link-uri de paginare mai târziu */}
            </div>
        </AuthenticatedLayout>
    );
}

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Poem from '@/Components/Poem';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, poems }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Creațiile Mele</h2>}
        >
            <Head title="Creațiile Mele" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg divide-y">
                        {poems.length > 0 ? (
                            poems.map(poem =>
                                <Poem key={poem.id} poem={poem} />
                            )
                        ) : (
                            <div className="p-6 text-center text-gray-600">
                                <p>Încă nu ai adăugat nicio creație.</p>
                                <Link
                                    href={route('poems.create')}
                                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Adaugă prima ta creație
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

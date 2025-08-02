import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Poem from '@/Components/Poem';
import { Head } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function Index({ auth, poems }) {
    if (auth.user) {
        return   <AuthenticatedLayout user={auth.user}>
            <Head title="Poezii" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {poems.data.map(poem =>
                        <Poem key={poem.id} poem={poem} />
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    }
    return <GuestLayout>  <Head title="Poezii" />

        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {poems.data.map(poem =>
                    <Poem key={poem.id} poem={poem} />
                )}
            </div>

        </div></GuestLayout>;
}

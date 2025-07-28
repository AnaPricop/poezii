import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Poem from '@/Components/Poem';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ poem, comments }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('poems.comments.store', poem.id), {
            onSuccess: () => reset(),
        });
    };

    const pageContent = (
        <>
            <Head title={poem.title} />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Afișăm poezia principală */}
                <div className="bg-white shadow-sm rounded-lg">
                    <Poem poem={poem} />
                </div>

                {auth.user && (
                    <form onSubmit={submit} className="mt-6">
                        <textarea
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                            placeholder="Adaugă un comentariu..."
                            className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <PrimaryButton className="mt-2" disabled={processing}>
                            Postează comentariul
                        </PrimaryButton>
                    </form>
                )}

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <h3 className="text-lg font-bold p-6">Comentarii</h3>
                    {comments.map(comment => (
                        <div key={comment.id} className="p-6 flex space-x-3">
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-gray-800 font-semibold">{comment.user.name}</span>
                                        <small className="ml-2 text-sm text-gray-600">{new Date(comment.created_at).toLocaleString()}</small>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700">{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    return auth.user ? (
        <AuthenticatedLayout>{pageContent}</AuthenticatedLayout>
    ) : (
        <GuestLayout>{pageContent}</GuestLayout>
    );
}

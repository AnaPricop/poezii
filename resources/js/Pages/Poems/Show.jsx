import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Poem from '@/Components/Poem';
import {Head, useForm, usePage} from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

const Comment = ({comment}) => (
    <div className="p-6 flex space-x-4">
        {/* Aici poți adăuga un avatar simplu */}
        <div
            className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-text-muted font-semibold">
            {comment.user.name.charAt(0)}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <div>
                    <span className="font-semibold text-text-main">{comment.user.name}</span>
                    <small
                        className="ml-2 text-sm text-text-muted">{new Date(comment.created_at).toLocaleDateString()}</small>
                </div>
            </div>
            <p className="mt-2 text-text-main whitespace-pre-wrap">{comment.body}</p>
        </div>
    </div>
);

export default function Show({poem, comments = []}) {
    const {auth} = usePage().props;

    const {data, setData, post, processing, errors, reset} = useForm({
        body: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('poems.comments.store', poem.id), {
            preserveScroll: true,
            onSuccess: () => {reset();setData('body', '');}
        });
    };

    const pageContent = (
        <>
            <Head title={poem.title}/>
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-surface shadow-sm rounded-lg border border-slate-200">
                    <Poem poem={poem}/>
                </div>

                {auth.user && (
                    <form onSubmit={submit} autoComplete="off"
                          className="mt-8 bg-surface p-6 rounded-lg shadow-sm border border-slate-200">
        <textarea
            value={data.body}
            autoComplete="new-password"
            onChange={(e) => setData('body', e.target.value)}
            placeholder={`Ce părere ai, ${auth.user.name}?`}
            className="w-full border-slate-300 focus:border-teal-500 focus:ring focus:ring-teal-500/50 rounded-md shadow-sm text-text-main bg-slate-50" // <-- LINIA MODIFICATĂ
        ></textarea>
                        <InputError message={errors.body} className="mt-2"/>
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Postează
                        </PrimaryButton>
                    </form>
                )}

                <div className="mt-8 bg-surface rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
                    <h3 className="text-xl font-bold p-6 text-text-main">
                        {comments.length} {comments.length === 1 ? 'Comentariu' : 'Comentarii'}
                    </h3>
                    {comments.length > 0 ? (
                        comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                    ) : (
                        <p className="p-6 text-text-muted">Fii primul care lasă un comentariu.</p>
                    )}
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

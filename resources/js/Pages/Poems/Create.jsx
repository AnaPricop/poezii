import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, Head } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        type: 'poezie', // Valoare default
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('poems.store'), {
            onSuccess: () => reset(), // Golește formularul după succes
        });
    };

    const poemTypes = ['poezie', 'proză', 'eseu', 'scenariu', 'citate', 'personale'];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Adaugă o creație nouă" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* Title Input */}
                    <InputLabel htmlFor="title" value="Titlu" />
                    <TextInput
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused={true}
                    />
                    <InputError message={errors.title} className="mt-2" />

                    {/* Subtitle Input */}
                    <div className="mt-4">
                        <InputLabel htmlFor="subtitle" value="Subtitlu (Opțional)" />
                        <TextInput
                            id="subtitle"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.subtitle} className="mt-2" />
                    </div>

                    {/* Type Select Dropdown */}
                    <div className="mt-4">
                        <InputLabel htmlFor="type" value="Tipul creației" />
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            {poemTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.type} className="mt-2" />
                    </div>

                    {/* Content Textarea */}
                    <div className="mt-4">
                        <InputLabel htmlFor="content" value="Conținut" />
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Scrie poezia aici..."
                            className="mt-1 block w-full h-40 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Publică
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

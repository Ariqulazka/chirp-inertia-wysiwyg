import React from 'react';
import Chirp from '@/Components/Chirp';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import ReactQuill from 'react-quill'; // Import ReactQuill (WYSIWYG Editor)
import 'react-quill/dist/quill.snow.css'; // Import gaya default ReactQuill

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '', // Field harus sesuai dengan ekspektasi server (gunakan "message")
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), {
            onSuccess: () => reset('message'), // Reset field message setelah sukses
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* Gunakan ReactQuill dengan field message */}
                    <ReactQuill
                        value={data.message} // Pastikan field sesuai ekspektasi server
                        placeholder="What's on your mind?"
                        className="bg-white rounded-md shadow-sm"
                        onChange={(content) => setData('message', content)} // Update field message saat ada perubahan
                    />
                    {/* Validasi error untuk message */}
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

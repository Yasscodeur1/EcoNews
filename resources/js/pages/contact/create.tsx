import { useForm } from '@inertiajs/react'

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('contact.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-2xl font-bold text-emerald-600">Contactez-nous</h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full text-slate-800 pl-3 rounded-md border-gray-300 shadow-sm"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full text-slate-800 pl-3 rounded-md border-gray-300 shadow-sm"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    id="message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="mt-1 block w-full text-slate-800 pl-3 rounded-md border-gray-300 shadow-sm"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button type="submit" disabled={processing} className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">
                {processing ? "Envoi..." : "Envoyer"}
            </button>
            <div className='text-center text-blue-700 hover:underline mt-10'>
                <a href={route('home')}>← Retour à l’accueil</a>
            </div>
        </form>
    );
}


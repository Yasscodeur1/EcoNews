import React from 'react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js'

export default function About() {
    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-5xl font-bold text-gray-100 mb-6">À propos de nous</h1>

            <section className="mb-8 text-gray-100 leading-relaxed">
                <p>
                    Bienvenue sur notre site ! Nous sommes passionnés par les <strong>technologies vertes</strong>, l'innovation durable,
                    et tout ce qui touche à un avenir plus respectueux de l’environnement.
                </p>
                <p className="mt-4">
                    Notre mission est simple : <strong>informer, sensibiliser et inspirer</strong> autour des solutions écologiques
                    et des avancées technologiques au service de la planète.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-100 mb-4">Ce que nous faisons</h2>
                <ul className="list-disc list-inside text-gray-100 space-y-2">
                    <li>Articles approfondis sur les innovations écologiques</li>
                    <li>Interviews d’experts et de pionniers du développement durable</li>
                    <li>Conseils pour réduire son empreinte carbone au quotidien</li>
                    <li>Mises en lumière de projets inspirants dans le monde entier</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-100 mb-4">Qui sommes-nous ?</h2>
                <p className="text-gray-100">
                    Une équipe de rédacteurs, développeurs, activistes et passionnés réunis autour d’une même vision :
                    faire progresser les technologies tout en protégeant la nature. 🌍
                </p>
            </section>

            {/* <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nous contacter</h2>
                <p className="text-gray-700">
                    Une question ? Une suggestion ? Un projet à nous partager ?
                    <br />
                    <Link href={route('contact')} className="text-blue-600 hover:underline">
                        Contactez-nous ici
                    </Link>
                    .
                </p>
            </section> */}

            {/* <div className="mt-10">
                <Link href={route('home')} className="text-blue-600 hover:underline">
                    ← Retour à l’accueil
                </Link>
            </div> */}
        </div>
    );
}

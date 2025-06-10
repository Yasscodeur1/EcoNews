import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import i18n from '@/i18n';
import { Link, router } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { route } from 'ziggy-js';

export default function AppNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    // Fonction qui gère la recherche
    const handleSearch = () => {
        if (!searchTerm.trim()) return; // Pas de recherche vide

        // Exemple d'appel API : envoyer la recherche
        fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Résultats:', data);
                // TODO: stocker / afficher les résultats (via state, context, ou navigation)
            })
            .catch((err) => {
                console.error('Erreur recherche:', err);
            });
    };

    // Optionnel : lancer recherche au "Enter"
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div>
            <nav className="fixed w-full bg-transparent/50 shadow shadow-amber-50">
                <div className="container mx-auto items-center justify-center px-6 py-3 md:flex">
                    {/* Langues */}
                    <div className="mx-5 flex gap-3">
                        <Button
                            className="h-10 cursor-pointer bg-slate-800 p-2"
                            onClick={() => {
                                i18n.changeLanguage('en');
                            }}
                        >
                            EN
                        </Button>
                        <Button className="h-10 cursor-pointer bg-slate-800 p-2" onClick={() => i18n.changeLanguage('fr')}>
                            FR
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <img className="h-16 w-auto rounded-2xl" src="/Images/ChatGPT Image 28 mai 2025, 13_44_09 (1).png" alt="Logo" />
                        </a>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500 hover:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div
                        className={`${
                            isOpen ? 'block' : 'hidden'
                        } absolute inset-x-0 z-20 w-full gap-5 bg-transparent/50 px-6 py-4 transition-all duration-300 ease-in-out md:relative md:top-0 md:mt-0 md:flex md:items-center md:justify-between md:p-0`}
                    >
                        <div className="-mx-4 flex flex-col px-2 md:mx-10 md:flex-row md:py-0">
                            <a
                                href={route('home')}
                                className="transform rounded-lg px-2.5 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 md:mx-2 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                {t('navbar.home')}
                            </a>
                            <a
                                href={route('about')}
                                className="w-24 transform rounded-lg px-2.5 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 md:mx-2 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                {t('navbar.about')}
                            </a>
                            <a
                                href={route('contact')}
                                className="transform rounded-lg px-2.5 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 md:mx-2 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                {t('navbar.contact')}
                            </a>
                        </div>

                        {/* Search bar */}
                        <div className="relative mt-4 md:mt-0">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            <input
                                type="text"
                                className="focus:ring-opacity-40 w-full rounded-lg border bg-white py-2 pr-4 pl-10 text-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <Link
                            className="flex cursor-pointer justify-end gap-1"
                            method="post"
                            href={route('logout')}
                            as="button"
                            onClick={handleLogout}
                        >
                            Log
                            {/* <LogOut className="" />    */}
                            <LogIn className="" />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

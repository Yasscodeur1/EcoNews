import AppNavbar from '@/components/app_navbar';
import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { component } = usePage();

  // Liste des pages où la Navbar doit s'afficher
  const showNavbarOn = ['welcome', 'About', 'contact']; // Composant Inertia (avec majuscule !)

  const shouldShowNavbar = showNavbarOn.includes(component);

  return (
    <>
      {shouldShowNavbar && <AppNavbar />}
      <main className='pt-28'>{children}</main>
    </>
  );
}

import AppNavbar from '@/components/app_navbar';
import { type ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
    </>
  );
}
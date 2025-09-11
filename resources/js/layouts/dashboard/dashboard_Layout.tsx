import { SidebarProvider } from '@/components/ui/sidebar'; // ou l’endroit où est défini ce provider
import { type ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
        <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}

import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import DashboardLayout from './layouts/dashboard/dashboard_Layout';
import PublicLayout from './layouts/public/public_layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: async (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx');
    const page = await resolvePageComponent(`./pages/${name}.tsx`, pages) as { default: any };

    // Layout dynamique : dashboard ou public
    const isDashboard = /dashboard/i.test(name);

    page.default.layout = page.default.layout || ((page: React.ReactNode) =>
      isDashboard ? <DashboardLayout>{page}</DashboardLayout> : <PublicLayout>{page}</PublicLayout>
    );

    return page;
  },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

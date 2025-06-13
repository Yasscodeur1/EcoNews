import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'EcoNews',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { stats } = (usePage().props as unknown) as {
        stats: {
            articles: number;
            users: number;
            comments: number;
            likes: number;
            tags: number;
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ecoNews | Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <h1 className="text-2xl font-semibold">Bienvenue sur le Dashboard ecoNews</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium">Articles publiés</h2>
                            <p className="mt-2 text-3xl font-bold text-primary">{stats.articles}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium">Utilisateurs</h2>
                            <p className="mt-2 text-3xl font-bold text-primary">{stats.users}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium">Commentaires</h2>
                            <p className="mt-2 text-3xl font-bold text-primary">{stats.comments}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium">Likes</h2>
                            <p className="mt-2 text-3xl font-bold text-primary">{stats.likes}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium">Tags</h2>
                            <p className="mt-2 text-3xl font-bold text-primary">{stats.tags}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* <div className="mt-6 rounded-xl border border-muted p-6 dark:border-sidebar-border">
                    <h2 className="mb-4 text-xl font-semibold">Statistiques récentes</h2>
                    <div className="relative min-h-[300px] w-full">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}
            </div>
        </AppLayout>
    );
}

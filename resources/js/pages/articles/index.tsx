import { Head } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';

type Article = {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path: string | null;
    category: { id: number; name: string } | null;
    status: string;
    is_featured: boolean;
    created_at: string;
};

interface IndexProps {
    articles: Article[];
}

export default function Index({ articles }: IndexProps) {
    return (
        <AuthLayout title="Articles" description="Liste des articles publiés.">
            <Head title="Articles" />
            <Link href={route('articles.create')} className="inline-block mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                + Nouvel Article
            </Link>

            <div className="space-y-6">
                {articles.length === 0 && (
                    <p className="text-muted-foreground">Aucun article pour le moment.</p>
                )}

                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:bg-slate-800"
                    >
                        {article.image_path && (
                            <img
                                src={article.image_path}
                                alt={article.title}
                                className="mb-4 h-48 w-full object-cover rounded"
                            />
                        )}

                        <h2 className="text-xl font-bold">{article.title}</h2>

                        <p className="text-sm text-gray-500 mb-2">
                            Catégorie : {article.category?.name || 'Non spécifiée'}
                        </p>

                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {article.content}
                        </p>

                        <div className="mt-4 text-sm text-muted-foreground">
                            Statut : {article.status === 'published' ? 'Publié' : 'Brouillon'} | Créé le :{' '}
                            {new Date(article.created_at).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </AuthLayout>
    );
}

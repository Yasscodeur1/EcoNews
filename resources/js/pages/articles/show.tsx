import { Link, router, useForm } from '@inertiajs/react';
import { Heart, Send } from 'lucide-react';
import React, { useState } from 'react';

type Category = {
    id: number;
    name: string;
};

type Like = {
    id: number;
    user_id: number;
    user: {
        name: string;
        avatar: string; // URL de l’image de profil
    };
};

type Comment = {
    id: number;
    content: string;
    user_id: number;
    user: {
        name: string;
    };
};

type Tag = {
    id: number;
    name: string;
};

type Article = {
    avatar: number;
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path: string | null;
    category: Category | null;
    status: string;
    is_featured: boolean;
    created_at: string;
    likes: Like[];
    comments: Comment[];
    tags: Tag[];
    user: {
        name: string;
    };
};

interface ShowProps {
    article: Article;
    auth: {
        user: {
            id: number;
            name: string;
        } | null;
    };
}

export default function Show({ article, auth }: ShowProps) {
    const { data, setData, post, reset } = useForm({
        body: '',
        articleId: article.id,
    });

    // const { tags } = usePage().props as unknown as { tags: Tag[] }; // Récupération des tags
    const [form, setForm] = useState<{ tags: number[] }>({ tags: [] });

    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    // Add form state for tags selection

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('comments.store'), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    const toggleLike = () => {
        router.post(
            route('likes.toggle', article.id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="bg-background/10 inset-0 z-0 mx-auto max-w-4xl p-6 backdrop-blur-sm">
            <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>

            <p className="mb-2 text-sm text-gray-600">
                Par <strong>{article.user.name}</strong> | {article.category?.name ?? 'Sans catégorie'} | Publié le{' '}
                {new Date(article.created_at).toLocaleDateString()}
            </p>

            {article.image_path && <img src={article.image_path} alt={article.title} className="mb-6 w-full rounded-md object-cover" />}

            <div className="prose dark:prose-invert mb-6 max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Like Button */}
            {/* <button onClick={toggleLike} className="mt-4 flex items-center gap-2 text-red-600 transition hover:text-red-700">
                <Heart className="h-5 w-5" />
                <span>J’aime ({article.likes.length && article.avatar})</span>
            </button> */}
            <button onClick={toggleLike} className="mt-4 flex items-center gap-2 text-red-600 transition hover:text-red-700">
                <Heart className="h-5 w-5" />
                <span>J’aime ({article.likes.length})</span>

                <div className="flex -space-x-2">
                    {article.likes
                        .slice(0, 3)
                        .filter((like) => like && like.user)
                        .map((like) => (
                            <img key={like.id} src={like.user.avatar} alt={like.user.name} className="h-6 w-6 rounded-full border-2 border-white" />
                        ))}
                    {article.likes.length > 3 && <span className="ml-2 text-sm text-gray-500">+{article.likes.length - 3}</span>}
                </div>
            </button>

            {/* Select tags - affichage des tags sélectionnables */}
            {article.tags.length > 0 && (
                <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Tags associés :</h4>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span key={tag.id} className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Comment form */}
            <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    placeholder="Ajoutez un commentaire..."
                    className="w-full rounded border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                />
                <button type="submit" className="mt-2 flex items-center rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                </button>
            </form>

            {/* Comment list */}
            {(article.comments || [])
                .filter((comment): comment is Comment => !!comment && !!comment.user)
                .map((comment) => (
                    <div key={comment.id} className="border-t pt-2 text-sm text-gray-800 dark:text-gray-200">
                        <strong>{comment.user.name}</strong> : {comment.content}
                        {auth.user && comment.user_id === auth.user.id && (
                            <div className="mt-1 flex gap-2 text-xs text-gray-500">
                                <button
                                    onClick={() => {
                                        setData('body', comment.content);
                                        setData('articleId', article.id);
                                        setEditingCommentId(comment.id);
                                    }}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Supprimer ce commentaire ?')) {
                                            router.delete(route('comments.destroy', comment.id), {
                                                preserveScroll: true,
                                            });
                                        }
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </div>
                ))}

            {/* Back to home */}
            <div className="mt-8">
                <Link href={route('home')} className="text-blue-600 hover:underline">
                    ← Retour à l’accueil
                </Link>
            </div>
        </div>
    );
}

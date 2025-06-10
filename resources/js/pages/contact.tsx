import HeaderHome from '@/components/headerHome';
import { useForm, router } from '@inertiajs/react';
import { Heart, Send} from 'lucide-react';
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';

type Category = {
  id: number;
  name: string;
};

type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_path: string;
  category_id: number;
};

interface Props {
  articles: Article[];
  categories: Category[];
}

export default function Welcome({ articles = [], categories = [] }: Props) {
  const { t } = useTranslation();

  const { data, setData, post, reset } = useForm({
    body: '',
    articleId: null,
  });

  const handleCommentSubmit = (e: React.FormEvent, articleId: number) => {
    e.preventDefault();
    post(route('comments.store'), {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  const toggleLike = (articleId: number) => {
    router.post(route('likes.toggle', articleId), {}, {
      preserveScroll: true,
    });
  };

  return (
    <>
      <HeaderHome />
      <div className="p-6 space-y-4 grid grid-cols-2 justify-center items-start">
        {articles.map((article) => (
          <div key={article.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold text-blue-600">
              <Link href={route('articles.show', article.slug)}>
                {article.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              {categories.find(cat => cat.id === article.category_id)?.name}
            </p>
            {article.image_path && (
              <img
                src={article.image_path}
                alt={article.title}
                className="mt-2 w-full max-w-md rounded"
              />
            )}
            <p className="mt-2 text-gray-700">{article.content.slice(0, 150)}...</p>

            {/* Like Button */}
            <button onClick={() => toggleLike(article.id)} className="mt-2 flex items-center gap-1 text-red-500">
              <Heart className="w-4 h-4" />
              J’aime
            </button>

            {/* Comment Form */}
            <form onSubmit={(e) => handleCommentSubmit(e, article.id)} className="mt-4">
              <textarea
                value={data.body}
                onChange={(e) => {
                  setData('body', e.target.value);
                  setData('articleId', article.id);
                }}
                placeholder="Ajouter un commentaire..."
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded flex items-center"
              >
                <Send className="w-4 h-4 mr-1" /> Envoyer
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}


import HeaderHome from '@/components/headerHome';
import { useForm, router } from '@inertiajs/react';
import { Heart, Send} from 'lucide-react';
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';

type Category = {
  id: number;
  name: string;
};

type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_path: string;
  category_id: number;
};

interface Props {
  articles: Article[];
  categories: Category[];
}

export default function Welcome({ articles = [], categories = [] }: Props) {
  const { t } = useTranslation();
  const { data, setData, post, reset } = useForm<{
      body: string;
      articleId: number | null;
    }>({
      body: '',
      articleId: null,
    });
  
    const handleCommentSubmit = (e: React.FormEvent, articleId: number) => {
      e.preventDefault();
      post(route('comments.store'), {
        onSuccess: () => reset(),
        preserveScroll: true,
      });
    };
  
    const toggleLike = (articleId: number) => {
      router.post(route('likes.toggle', articleId), {}, {
        preserveScroll: true,
      });
    };


  return (
    <>
      <HeaderHome/>
      <div className="p-6 space-y-4 grid grid-cols-2 justify-center items-center ">
      {articles.map((article) => (
        <div key={article.id} className="border-b pb-4">
          <h2 className="text-xl font-bold text-blue-600">
            <Link href={route('articles.show', article.slug)}>
              {article.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">
            {categories.find(cat => cat.id === article.category_id)?.name}
          </p>
          {article.image_path && (
            <img
              src={article.image_path}
              alt={article.title}
              className="mt-2 w-full max-w-md rounded"
            />
          )}
          <p className="mt-2 text-gray-700">{article.content.slice(0, 150)}...</p>
          <form method="post" action={route('likes.toggle', article.id)}>
            <button type="submit">
              ❤️ Like
            </button>
          </form>

          {/* Like Button */}
            {/* <button onClick={() => toggleLike(article.id)} className="mt-2 flex items-center gap-1 text-red-500">
              <Heart className="w-4 h-4" />
              J’aime
            </button> */}

            {/* Comment Form */}
            <form onSubmit={(e) => handleCommentSubmit(e, article.id)} className="mt-4">
              <textarea
                value={data.body}
                onChange={(e) => {
                  setData('body', e.target.value);
                  setData('articleId', article.id);
                }}
                placeholder="Ajouter un commentaire..."
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded flex items-center"
              >
                <Send className="w-4 h-4 mr-1" /> Envoyer
              </button>
            </form>
        </div>
      ))}
    </div>
    </>
  );
}


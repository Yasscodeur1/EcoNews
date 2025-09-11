import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';
import HeaderHome from '@/components/headerHome';

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

  return (
    <div className='inset-0 bg-background/10 backdrop-blur-sm z-0'>
      <HeaderHome/>
      <h1 className='text-center text-5xl my-10 underline'>Actualité</h1>
      <div className="p-6 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 md:mx-10 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="border-b pb-4">
          <h2 className="text-xl font-bold text-blue-600">
            <Link href={route('articles.show', article.slug)}>
              {article.title}
            </Link>
          </h2>
          <p className="mt-2text-sm text-gray-500">
            {categories.find(cat => cat.id === article.category_id)?.name}
          </p>
          {article.image_path && (
            <img
              src={article.image_path}
              alt={article.title}
              className="mt-3 w-full  max-w-md rounded"
            />
          )}
          <p className="mt-3 text-gray-100">{article.content.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
    </div>
  );
}

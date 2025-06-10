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
  // console.log('Articles:', articles);
  // if (!articles || articles.length === 0) {
  //   return <p>Aucun article trouvé.</p>;
  // }


  return (
    <>
      <HeaderHome/>
      <div className="p-6 grid grid-cols-2 gap-6">
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
              className="mt-2 w-full  max-w-md rounded"
            />
          )}
          <p className="mt-2 text-gray-700">{article.content.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
    </>
  );
}

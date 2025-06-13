import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Input, Button } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react'; // ❗️Ajout nécessaire

type Category = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type Auth = {
  user: {
    id: number;
  };
};

interface CreateProps {
  categories: Category[];
  auth: Auth;
}

export default function Create({ categories, auth }: CreateProps) {
  const { tags } = usePage<{ tags: Tag[] }>().props;

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    slug: '',
    content: '',
    image_path: '',
    user_id: auth.user.id,
    category_id: '',
    tags: [] as number[], // ✅
    status: 'draft',
    is_featured: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('articles.store'));
  };

  return (
    <AuthLayout
      title="Créer un article"
      description="Créer un nouvel article pour organiser votre page."
    >
      <Head title="Nouvel article" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Titre
          </label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            disabled={processing}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          />
          <InputError message={errors.title} />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">
            Slug
          </label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value)}
            disabled={processing}
          />
          <InputError message={errors.slug} />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Contenu
          </label>
          <textarea
            id="content"
            rows={5}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
            disabled={processing}
          />
          <InputError message={errors.content} />
        </div>

        <div>
          <label htmlFor="image_path" className="block text-sm font-medium mb-1">
            Image (URL ou chemin)
          </label>
          <Input
            id="image_path"
            value={data.image_path}
            onChange={(e) => setData('image_path', e.target.value)}
            disabled={processing}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          />
          <InputError message={errors.image_path} />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium mb-1">
            Catégorie
          </label>
          <select
            id="category_id"
            value={data.category_id}
            onChange={(e) => setData('category_id', e.target.value)}
            disabled={processing}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          >
            <option value="">-- Choisir une catégorie --</option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <InputError message={errors.category_id} />
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Tags</label>
            <select
              multiple
              name="tags"
              value={data.tags.map(String)}
              onChange={(e) =>
                setData(
                  'tags',
                  Array.from(e.target.selectedOptions, (option) => Number(option.value))
                )
              }
              className="form-select w-full rounded border p-2"
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <InputError message={errors.tags} />
          </div>
        )}

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Statut
          </label>
          <select
            id="status"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
            disabled={processing}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
          <InputError message={errors.status} />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_featured"
            checked={data.is_featured}
            onChange={(e) => setData('is_featured', e.target.checked)}
            disabled={processing}
          />
          <label htmlFor="is_featured" className="text-sm font-medium">
            Mettre en avant
          </label>
        </div>

        <Button
          type="submit"
          disabled={processing}
          className="w-full rounded-md border border-button bg-background px-3 py-2 text-sm shadow-sm cursor-pointer"
        >
          Créer l'article
        </Button>
      </form>
    </AuthLayout>
  );
}

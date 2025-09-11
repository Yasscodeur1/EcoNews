import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type CreateCategoryProps = {
    categories?: Array<{ id: number; name: string }>;
};

export default function CreateCategory({ categories = [] }: CreateCategoryProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        icon: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AuthLayout title="Créer une catégorie" description="Créer une nouvelle catégorie pour organiser vos articles.">
            <Head title="Nouvelle catégorie" />
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                {/* <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.slug} />
                </div> */}
                <p className="text-sm text-muted-foreground">Slug généré : {data.slug}</p>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.description} />
                </div>

                <div>
                    <Label htmlFor="icon">Icône</Label>
                    <Input
                        id="icon"
                        value={data.icon}
                        onChange={(e) => setData('icon', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.icon} />
                </div>

                {/* Exemple d'utilisation de categories si besoin */}
                <div>
                    <Label>Catégories disponibles</Label>
                    <select disabled>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button type="submit" disabled={processing}>
                    Créer
                </Button>
            </form>
        </AuthLayout>
    );
}

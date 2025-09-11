import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateRole() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    // **admin**, **webmaster**, **auteur**, **lecteur**

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Créer un rôle" />
            <div className="max-w-xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">Créer un nouveau rôle</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nom du rôle</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <Button type="submit" disabled={processing}>
                        Créer
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

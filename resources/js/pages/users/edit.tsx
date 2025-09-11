// import React from 'react'

// export default function edit() {
//   return (
//     <div>edit</div>
//   )
// }


 return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input
                            id="avatar"
                            type="text"
                            tabIndex={5}
                            value={data.avatar}
                            onChange={(e) => setData('avatar', e.target.value)}
                            disabled={processing}
                            placeholder="https://example.com/avatar.jpg"
                        />
                        <InputError message={errors.avatar} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                            id="bio"
                            type="text"
                            tabIndex={6}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            disabled={processing}
                            placeholder="A few words about you"
                        />
                        <InputError message={errors.bio} />
                    </div>

                    {/* <div className="grid gap-2">
                    <Label htmlFor="roles">Roles</Label>
                    <select
                      id="roles"
                      name="roles[]"
                      multiple
                      size={availableRoles?.length || 1}
                      value={(data.roles ?? []).map(String)}
                      onChange={(e) => {
                        const selectedRoles = Array.from(e.target.selectedOptions, option =>
                          parseInt(option.value)
                        );
                        setData('roles', selectedRoles);
                      }}
                      disabled={processing}
                    >
                      {(availableRoles ?? []).map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <InputError message={errors.roles} />
                    </div> */}


                    <div className="grid gap-2">
                        <Label htmlFor="roles">Roles (IDs comma separated)</Label>
                        <Input
                            id="roles"
                            type="text"
                            placeholder="e.g. 1,2"
                            value={data.roles.join(',')}
                            onChange={(e) => {
                                const roleIds = e.target.value
                                .split(',')
                                .map((id) => parseInt(id.trim()))
                                .filter((id) => !isNaN(id));
                                setData('roles', roleIds);
                            }}
                            disabled={processing}
                        />
                        <InputError message={errors.roles} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
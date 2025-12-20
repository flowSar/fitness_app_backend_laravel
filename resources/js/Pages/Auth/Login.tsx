import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Logo/Brand */}
            <div className="mb-8 text-center">
                <Link href="/">
                    <h1 className="mb-2 text-4xl font-bold text-white">
                        w.<span className="text-emerald-600">all</span>Fit
                    </h1>
                </Link>
                <p className="text-gray-400">Welcome back to your fitness journey</p>
            </div>

            {status && <div className="mb-4 rounded-lg bg-emerald-900/20 p-3 text-sm font-medium text-emerald-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-5">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', (e.target.checked || false) as false)}
                        />
                        <span className="ms-2 text-sm text-gray-400">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log in'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-medium text-emerald-600 transition-colors hover:text-emerald-500">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Back to home */}
            <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-gray-400 transition-colors hover:text-emerald-600">
                    ← Back to home
                </Link>
            </div>
        </GuestLayout>
    );
}

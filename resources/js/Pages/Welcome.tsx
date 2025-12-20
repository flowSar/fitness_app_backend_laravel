import { useState } from 'react';

export default function Welcome() {
    const [auth] = useState({ user: null }); // Simulated auth state

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="relative flex min-h-screen flex-col">
                {/* Header */}
                <header className="absolute left-0 right-0 top-0 z-10 px-6 py-6">
                    <nav className="flex justify-end gap-3">
                        {auth.user ? (
                            <a
                                href="/dashboard"
                                className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 dark:text-gray-300"
                                >
                                    Log in
                                </a>
                                <a
                                    href="/register"
                                    className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-600/30 transition-colors hover:bg-emerald-700"
                                >
                                    Get Started
                                </a>
                            </>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex flex-1 items-center justify-center px-6 py-20">
                    <div className="max-w-2xl text-center">
                        {/* Logo/Brand */}
                        <div className="mb-8">
                            <h1 className="mb-4 text-6xl font-bold text-gray-900 md:text-7xl dark:text-white">
                                w.<span className="text-emerald-600">all</span>Fit
                            </h1>
                            <div className="mx-auto h-1 w-24 rounded-full bg-emerald-600"></div>
                        </div>

                        {/* Tagline */}
                        <p className="mb-12 text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                            Your fitness journey starts here.
                            <br />
                            <span className="font-medium text-emerald-600">All workouts. All goals. All you.</span>
                        </p>

                        {/* CTA Button */}
                        <a
                            href="/register"
                            className="inline-block rounded-full bg-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 hover:bg-emerald-700"
                        >
                            Start Your Journey
                        </a>

                        {/* Features */}
                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">Track Progress</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your fitness journey</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">Custom Plans</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Workouts tailored for you</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">Community</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with others</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">© 2024 w.allFit. All rights reserved.</footer>
            </div>
        </div>
    );
}

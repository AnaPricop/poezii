import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import NavLink from "@/Components/NavLink.jsx";

export default function Guest({ children }) {
    // Verificăm dacă rutele de login/register există, pentru a afișa butoanele condiționat
    const { canLogin, canRegister } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <nav className="bg-white border-b border-gray-100 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Acasă
                                </NavLink>
                                <NavLink href={route('poems.index')} active={route().current('poems.index')}>
                                    Poezii
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center ml-6">
                            {canLogin && (
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>
                            )}

                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}

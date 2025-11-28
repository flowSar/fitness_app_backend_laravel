import SideBar from '@/Components/SideBar';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex w-full flex-1 py-4">
                <div className="dark:bg-spaceGray flex w-full flex-1 gap-4 bg-white px-2 shadow-sm sm:rounded-lg">
                    <SideBar />
                    <div className="w-5/6 bg-white/10 px-2 py-4 text-black dark:text-white">{children}</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default DashboardLayout;

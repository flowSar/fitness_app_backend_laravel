import { MenuItem } from '@/types';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GrPlan } from 'react-icons/gr';
import { IoCreateOutline, IoGitNetworkOutline } from 'react-icons/io5';

import SidebarCollapsibleMenu from './SidebarCollapsibleMenu';

function SideBar() {
    const sideBarMenuList: MenuItem[] = [
        {
            id: 1,
            title: 'dashboard',
            href: '/dashboard',
            icon: <AiOutlineDashboard />,
            // open: false,
        },
        {
            id: 2,
            title: 'workout plans',
            open: false,
            icon: <IoGitNetworkOutline />,
            subTree: [
                {
                    id: 6,
                    title: 'Workout Plans',
                    href: '/dashboard/plans',
                    icon: <GrPlan />,
                },
                {
                    id: 4,
                    title: 'Create plans',
                    href: '/dashboard/plans/create',
                    icon: <IoCreateOutline />,
                },
            ],
        },

        {
            id: 3,
            title: 'Exercises',
            open: false,
            icon: <IoGitNetworkOutline />,
            subTree: [
                {
                    id: 7,
                    title: 'Exercises',
                    href: '/dashboard/exercises',
                    icon: <GrPlan />,
                },
                {
                    id: 5,
                    title: 'Create Exercises',
                    href: '/dashboard/exercises/create',
                    icon: <IoCreateOutline />,
                },
            ],
        },
    ];
    return (
        <aside className="flex w-1/6 flex-col bg-white/10 p-4 text-black dark:text-white">
            <div className="h-8">W-AllFit</div>
            <div className="flex-1">
                <SidebarCollapsibleMenu menuList={sideBarMenuList} />
            </div>
            <div className="h-8">user info</div>
        </aside>
    );
}

export default SideBar;

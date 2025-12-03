import { MenuItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

function SidebarCollapsibleMenu({ menuList = [] }: { menuList: MenuItem[] }) {
    const [menu, setMenu] = useState<MenuItem[]>(menuList);

    const openMenu = (index: number) => {
        // console.log(menu[index]);
        setMenu((old) => {
            if (index == 0) return old;
            const updated = [...old]; // make a copy
            updated[index] = {
                ...old[index],
                open: !old[index].open,
            };
            return updated;
        });
        console.log(menu);
    };
    return (
        <ul>
            {menu.map((item, index) => {
                return (
                    <li
                        onClick={() => openMenu(index)}
                        key={item.title}
                        className={`w-full cursor-pointer rounded-lg ${!item.open ? 'hover:bg-white/10' : ''}`}
                    >
                        <div className="flex w-full items-center justify-between p-2 text-start">
                            <div className="flex items-center gap-2">
                                {item.icon ? item.icon : <></>}
                                <button className={`font-semibold ${item.open ? '' : ''}`}>
                                    {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                                </button>
                            </div>

                            {item.open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                        </div>

                        {item.open ? (
                            <ul key={Math.random()} className="w-full">
                                {item.subTree?.map((subItem) => {
                                    return (
                                        <li
                                            key={subItem.title}
                                            className="flex cursor-pointer items-center gap-2 p-1.5 pl-4 duration-200 hover:rounded-lg hover:bg-white/25"
                                        >
                                            {subItem.icon ? subItem.icon : <></>}
                                            <Link href={subItem.href}>{subItem.title}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default SidebarCollapsibleMenu;

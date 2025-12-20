import { PlanInterafce, SessionInterface } from '@/types';
import { ChangeEvent } from 'react';

function SelectOptionMenu({ data, onChnage }: { data: SessionInterface[] | PlanInterafce[]; onChnage: (e: ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div className="mt-2">
            <label htmlFor="level">Plan Sessions:</label>
            <select className="mt-2 block w-full py-3 dark:bg-black/10" onChange={onChnage}>
                {data.map((session) => {
                    return (
                        <option key={session.id} value={session.id} className="dark:bg-black/10 dark:text-black">
                            {session.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default SelectOptionMenu;

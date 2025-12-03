import LinearExercisePreviewCard from '@/Components/LinearExercisePreviewCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PlanInterafce, SessionInterface } from '@/types';
import { Link } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';

function Index({ plans = [] }: { plans: PlanInterafce[] }) {
    const [plan, setPlan] = useState<PlanInterafce>(plans[0]);
    const [selectedSession, setSelectedSession] = useState<SessionInterface>(plans[0].sessions[0]);

    const handlePlanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedPlan = plans.filter((p) => p.id === e.target.value);
        setPlan(selectedPlan[0]);
        console.log(selectedPlan);
    };
    const handleSessionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedSession = plan.sessions.filter((s) => s.id === e.target.value);
        setSelectedSession(newSelectedSession[0]);
        console.log(newSelectedSession[0]);
    };
    return (
        <DashboardLayout>
            <header className="flex h-16 items-center justify-center rounded-lg text-2xl font-bold dark:bg-black/30">Plan Sessions</header>
            <div>
                <div className="mt-2">
                    <label htmlFor="level">Workout Plans:</label>
                    <select className="mt-2 block w-full py-3 dark:bg-black/10" onChange={handlePlanSelect}>
                        {plans.map((plan) => {
                            return (
                                <option key={plan.id} value={plan.id} className="dark:bg-black/10 dark:text-black">
                                    {plan.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mt-2">
                    <label htmlFor="level">Plan Sessions:</label>
                    <select className="mt-2 block w-full py-3 dark:bg-black/10" onChange={handleSessionSelect}>
                        {plan?.sessions.map((session) => {
                            return (
                                <option key={session.id} value={session.id} className="dark:bg-black/10 dark:text-black">
                                    {session.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="mt-2">
                    {selectedSession?.session_exercises?.length ? (
                        selectedSession.session_exercises?.map((sessionEx) => {
                            return <LinearExercisePreviewCard key={sessionEx.id} exercise={sessionEx.exercise} />;
                        })
                    ) : (
                        <div className="mt-10 flex h-16 items-center justify-center border-2 border-dotted border-red-400">
                            <p>
                                this session is empty create workout lan for this session{' '}
                                <Link href={'/dashboard/planSessionWorkout/create'} className="text-blue-500 underline">
                                    create
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Index;

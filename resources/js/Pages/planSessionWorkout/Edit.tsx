import ExerciseSelectDialog from '@/Components/ExerciseSelectDialog';
import LinearExercisePreviewCard from '@/Components/LinearExercisePreviewCard';
import SelectOptionMenu from '@/Components/SelectOptionMenu';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExerciseInterface, PlanInterafce, SessionInterface } from '@/types';
import { Link } from '@inertiajs/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

function Edit({ plans = [], exercises = [] }: { plans: PlanInterafce[]; exercises: ExerciseInterface[] }) {
    const [plan, setPlan] = useState<PlanInterafce>(plans[0]);
    const [selectedSession, setSelectedSession] = useState<SessionInterface>(plans[0].sessions[0]);
    const [selectedExercisesIds, setSelectedExerciIds] = useState<string[]>(selectedSession.session_exercises?.map((ex) => ex.exercise.id)!);
    const dialogRef = useRef<HTMLDialogElement>(null);

    // const sessionExercisesIds = selectedSession.session_exercises?.map((ex) => ex.exercise.id);

    const handlePlanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedPlan = plans.filter((p) => p.id === e.target.value);
        setPlan(selectedPlan[0]);
        setSelectedSession(selectedPlan[0].sessions[0]);
    };
    const handleSessionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedSession = plan.sessions.filter((s) => s.id === e.target.value);
        setSelectedSession(newSelectedSession[0]);
    };

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    useEffect(() => {
        const sessionExercisesIds = selectedSession.session_exercises?.map((ex) => ex.exercise.id);
        setSelectedExerciIds(sessionExercisesIds!);
    }, [selectedSession]);

    const handleSelectedExercises = (ids: string[]) => {};
    return (
        <DashboardLayout>
            <header className="flex h-16 items-center justify-center rounded-lg text-2xl font-bold dark:bg-black/30">Plan Sessions</header>
            <div className="mt-4 flex items-center justify-end">
                <div className="space-x-2">
                    <button className="rounded-md bg-red-600 px-4 py-2 text-lg font-semibold text-white">Delete</button>
                    <a onClick={() => {}} href="#edit" className="rounded-md bg-green-600 px-4 py-2 text-lg font-semibold text-white">
                        Edite
                    </a>
                </div>
            </div>
            <div>
                <SelectOptionMenu onChnage={handlePlanSelect} data={plans} />

                <SelectOptionMenu onChnage={handleSessionSelect} data={plan?.sessions} />

                <div className="mt-2">
                    {selectedSession?.session_exercises?.length ? (
                        selectedSession.session_exercises?.map((sessionEx) => {
                            return <LinearExercisePreviewCard key={sessionEx.id} exercise={sessionEx.exercise} />;
                        })
                    ) : (
                        <div className="mt-10 flex h-16 items-center justify-center border-2 border-dotted border-red-400">
                            <p>
                                this session is empty create workout plan for this session{' '}
                                <Link href={'/dashboard/planSessionWorkout/create'} className="text-blue-500 underline">
                                    create
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <>
                <div id="edit">
                    <div onClick={openDialog} className="mt-6 cursor-pointer border-2 border-dotted border-red-400 px-4 py-3 text-center">
                        <h1>Add Exercise</h1>
                    </div>
                    <div className="mt-4 space-x-4 text-end">
                        <button onClick={() => {}} className="rounded-md bg-gray-900 px-4 py-2 text-lg font-semibold text-white">
                            Cancel
                        </button>

                        <button className="rounded-md bg-gray-600 px-4 py-2 text-lg font-semibold text-white">Update</button>
                    </div>
                </div>
                <ExerciseSelectDialog
                    sessionExercises={selectedExercisesIds}
                    exercises={exercises}
                    dialogRef={dialogRef}
                    onSelectedValue={handleSelectedExercises}
                />
            </>
        </DashboardLayout>
    );
}

export default Edit;

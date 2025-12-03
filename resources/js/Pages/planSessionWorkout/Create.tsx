import ExerciseSelectDialog from '@/Components/ExerciseSelectDialog';
import InputError from '@/Components/InputError';
import LinearExerciseCard from '@/Components/LinearExerciseCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExerciseInterface, PlanInterafce } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, useRef, useState } from 'react';

// type InputKeyType = 'exercises' | 'sessionId' | 'planId';
interface FormInterface {
    planId: string;
    sessionId: string;
    exercises: ExerciseInterface[];
    [key: string]: any;
}

interface ExerciseConfig {
    id: string;
    sets: number;
    reps: number;
    duration: number;
}

function Create({ exercises = [], plans = [] }: { exercises: ExerciseInterface[]; plans: PlanInterafce[] }) {
    const { flush }: any = usePage().props;

    const [selectedExercises, setSelectedExercises] = useState<ExerciseInterface[]>([]);
    const [selectedExercisesConfig, setSelectedExercisesConfig] = useState<ExerciseConfig[]>([]);

    const [selectedPlan, setSelectedPlan] = useState<PlanInterafce>(plans[0]);

    const [selectedSessionId, setSelectedSessionId] = useState<string>(plans[0].sessions[0] ? plans[0].sessions[0].id : '');

    const dialogRef = useRef<HTMLDialogElement>(null);

    const { post, data, setData, errors, processing } = useForm({
        planId: selectedPlan.id,
        sessionId: selectedSessionId,
        exercises: [] as string[],
    });

    const handleFormSubmit = () => {
        post('/dashboard/planSessionExercises');
    };

    const handleSelectedExercises = (ids: string[]) => {
        const selected = exercises.filter((exercise) => ids.includes(exercise.id));
        setSelectedExercises(() => [...selected]);

        if (selectedExercisesConfig.length === 0) {
            const selectedConfig = selected.map((exercise) => {
                return {
                    id: exercise.id,
                    sets: 1,
                    reps: 1,
                    duration: 0,
                };
            });
            setSelectedExercisesConfig([...selectedConfig]);
        } else {
            // first filter remove unselected
            const newSelectedConfig = selectedExercisesConfig.filter((e) => ids.includes(e.id));
            // compase and insert if the last selected

            if (selected.length !== newSelectedConfig.length) {
                newSelectedConfig.push({
                    id: ids[ids.length - 1],
                    sets: 1,
                    reps: 1,
                    duration: 0,
                });
            }

            setSelectedExercisesConfig([...newSelectedConfig]);

            // insert new selectedExercisesList
            setData(
                'exercises',
                newSelectedConfig.map((config) => JSON.stringify(config)),
            );
        }
    };

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const handlePlanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log('fuck');
        const planId = e.target.value;
        const plan = plans.filter((plan) => plan.id === planId);
        console.log('plans: ', plan.length, plan, planId);
        setSelectedPlan(plan[0]);
        setData('planId', plan[0].id);
    };

    const handExerciseConfigChnage = ({ id, sets, reps, duration }: ExerciseConfig) => {
        const exerConfig = {
            id,
            sets,
            reps,
            duration,
        };
        const newExercisesConfig = selectedExercisesConfig.map((config) => {
            if (config.id === exerConfig.id) {
                return exerConfig;
            }
            return config;
        });
        setSelectedExercisesConfig([...newExercisesConfig]);
        setData(
            'exercises',
            newExercisesConfig.map((config) => JSON.stringify(config)),
        );
    };

    return (
        <DashboardLayout>
            <div className="ml-10">
                <header className="flex h-16 items-center justify-center rounded-lg text-2xl font-bold dark:bg-black/30">
                    Create plan Session workout
                </header>
                <div className="w-2xl">
                    {/* level */}
                    <div className="mt-2">
                        <label htmlFor="level">Workout Plans:</label>
                        <select value={selectedPlan.id} className="mt-2 block w-full py-3 dark:bg-black/10" onChange={handlePlanSelect}>
                            {plans.map((plan) => {
                                return (
                                    <option key={plan.id} value={plan.id} className="dark:bg-black/10 dark:text-black">
                                        {plan.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {/* sessions */}
                    <div className="mt-2">
                        <label htmlFor="level">Plan Sessions:</label>
                        <select
                            value={selectedSessionId}
                            className="mt-2 block w-full py-3 dark:bg-black/10"
                            onChange={(e) => {
                                setData('sessionId', e.target.value);
                                setSelectedSessionId(e.target.value);
                            }}
                        >
                            {selectedPlan.sessions.map((session) => {
                                return (
                                    <option key={session.id} value={session.id} className="dark:bg-black/10 dark:text-black">
                                        {session.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {selectedExercises.map((exercise) => (
                        <LinearExerciseCard key={exercise.id} exercise={exercise} exerciseConfigChange={handExerciseConfigChnage} />
                    ))}
                    <InputError message={errors.exercises} className="mt-2" />
                    <div onClick={openDialog} className="mt-6 cursor-pointer border-2 border-dotted border-red-400 px-4 py-3 text-center">
                        <h1>Add Exercise</h1>
                    </div>

                    <div className="mt-4 text-end">
                        <input
                            disabled={processing}
                            type="submit"
                            onClick={handleFormSubmit}
                            value={'create'}
                            className="cursor-pointer rounded-lg px-8 py-3 duration-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                        />
                    </div>
                </div>
                <ExerciseSelectDialog exercises={exercises} dialogRef={dialogRef} onSelectedValue={handleSelectedExercises} />
            </div>
        </DashboardLayout>
    );
}

export default Create;

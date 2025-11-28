import ExerciseCard from '@/Components/ExerciseCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExerciseInterface } from '@/types';

function index({ exercises }: { exercises: ExerciseInterface[] }) {
    return (
        <DashboardLayout>
            <header className="flex h-16 items-center justify-center rounded-lg text-2xl font-bold dark:bg-black/30">Exercises</header>
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-2">
                {exercises.map((exercise) => {
                    return <ExerciseCard exercise={exercise} />;
                })}
            </div>
        </DashboardLayout>
    );
}

export default index;

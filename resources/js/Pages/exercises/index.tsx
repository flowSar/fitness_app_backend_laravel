import ExerciseCard from '@/Components/ExerciseCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExerciseInterface } from '@/types';

function index({ exercises }: { exercises: ExerciseInterface[] }) {
    return (
        <DashboardLayout>
            <div className="mx-10 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {exercises.map((exercise) => {
                    return <ExerciseCard exercise={exercise} />;
                })}
            </div>
        </DashboardLayout>
    );
}

export default index;

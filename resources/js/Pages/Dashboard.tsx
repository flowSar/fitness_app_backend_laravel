import ActivePlanIcon from '@/Components/icons/ActivePlanIcon';
import ExerciseIcon from '@/Components/icons/ExerciseIcon';
import ReciptIcon from '@/Components/icons/ReciptIcon';
import UsersIcon from '@/Components/icons/UsersIcon';
import DashboardLayout from '@/Layouts/DashboardLayout';

interface DashboardProps {
    plansNumber: number;
    usersNumber: number;
    exercisesNumber: number;
}

export default function Dashboard({ plansNumber, usersNumber, exercisesNumber }: DashboardProps) {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-4 p-6 md:flex-row">
                <div className="flex h-48 w-full flex-col items-center justify-center space-y-2 rounded-lg bg-black/20 shadow-lg shadow-white/0 md:w-1/4">
                    <UsersIcon />
                    <h1 className="text-xl font-semibold">Total Users</h1>
                    <h1 className="text-2xl font-bold">{usersNumber}</h1>
                </div>
                <div className="flex h-48 w-full flex-col items-center justify-center space-y-2 rounded-lg bg-black/20 shadow-lg shadow-white/0 md:w-1/4">
                    <ActivePlanIcon />
                    <h1 className="text-xl font-semibold">Active Workout Plans</h1>
                    <h1 className="text-2xl font-bold">{plansNumber}</h1>
                </div>
                <div className="flex h-48 w-full flex-col items-center justify-center space-y-2 rounded-lg bg-black/20 shadow-lg shadow-white/0 md:w-1/4">
                    <ExerciseIcon />
                    <h1 className="text-xl font-semibold">Total exercises</h1>
                    <h1 className="text-2xl font-bold">{exercisesNumber}</h1>
                </div>
                <div className="flex h-48 w-full flex-col items-center justify-center space-y-2 rounded-lg bg-black/20 shadow-lg shadow-white/0 md:w-1/4">
                    <ReciptIcon />
                    <h1 className="text-xl font-semibold">Recipies</h1>
                    <h1 className="text-2xl font-bold">200</h1>
                </div>
            </div>
        </DashboardLayout>
    );
}

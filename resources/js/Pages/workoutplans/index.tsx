import PlanCard from '@/Components/PlanCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PlanInterafce } from '@/types';

function index({ plans }: { plans: PlanInterafce[] }) {
    console.log(plans);
    return (
        <DashboardLayout>
            <header className="ml-10 mr-4 flex h-16 items-center justify-center text-2xl font-bold dark:bg-gray-800">Workout Plans</header>
            <div className="ml-10 mt-4 grid w-full grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 pr-14">
                {plans.map((plan) => {
                    return <PlanCard plan={plan} />;
                })}
            </div>
        </DashboardLayout>
    );
}

export default index;

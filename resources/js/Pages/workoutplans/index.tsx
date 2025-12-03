import PlanCard from '@/Components/PlanCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PlanInterafce } from '@/types';

function index({ plans }: { plans: PlanInterafce[] }) {
    return (
        <DashboardLayout>
            <header className="flex h-16 items-center justify-center text-2xl font-bold dark:bg-black/30">Workout Plans</header>
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 p-4">
                {plans.map((plan) => {
                    return <PlanCard key={plan.id} plan={plan} />;
                })}
            </div>
        </DashboardLayout>
    );
}

export default index;

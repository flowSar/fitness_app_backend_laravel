import { PlanInterafce } from '@/types';

function PlanCard({ plan }: { plan: PlanInterafce }) {
    return (
        <div className="group dark:hover:bg-gray-750 max-w-sm cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:shadow-black/20 dark:hover:shadow-black/30">
            {/* Image */}
            <div className="h-[160px] overflow-hidden">
                <img
                    src={plan.image}
                    alt="Workout"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <h1 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    {plan.name}
                </h1>

                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {plan.description.length > 100
                        ? `${plan.description.substring(0, 100)}...`
                        : plan.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>Duration: {plan.duration}min</div>
                    <div>Level: {plan.level}</div>
                </div>
            </div>
        </div>
    );
}

export default PlanCard;

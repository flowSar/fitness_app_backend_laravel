import { ExerciseInterface } from '@/types';

function ExerciseCard({ exercise }: { exercise: ExerciseInterface }) {
    return (
        <div className="group dark:hover:bg-gray-750 w-[200px] cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl dark:bg-gray-800 dark:shadow-black/20 dark:hover:shadow-black/30">
            {/* Image */}
            <div className="h-[120px] overflow-hidden">
                <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="space-y-2 p-4">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    {exercise.name}
                </h1>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exercise.description.length > 59
                        ? `${exercise.description.substring(0, 50)}...`
                        : exercise.description}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Level:</span>{' '}
                    {exercise.level}
                </p>
            </div>
        </div>
    );
}

export default ExerciseCard;

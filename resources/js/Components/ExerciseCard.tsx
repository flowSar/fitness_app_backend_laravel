import { ExerciseInterface } from '@/types';
import { Link } from '@inertiajs/react';

function ExerciseCard({ exercise }: { exercise: ExerciseInterface }) {
    return (
        <div className="dark:hover:bg-gray-750 group w-[220px] cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-black/40 dark:shadow-black/20 dark:hover:shadow-black/30">
            {/* Image */}
            <div className="h-[120px] overflow-hidden">
                {exercise.image.includes('mp4') ? (
                    <video src={exercise.image} autoPlay muted playsInline className="h-full w-full object-cover"></video>
                ) : (
                    <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="h-full w-full object-cover"
                        // className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Content */}
            <div className="space-y-2 p-4">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{exercise.name}</h1>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exercise.description.length > 59 ? `${exercise.description.substring(0, 50)}...` : exercise.description}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Level:</span> {exercise.level}
                </p>
                <div className="mt-2 flex gap-4">
                    <Link href={`/dashboard/exercises/${exercise.id}/edit`} className="rounded-lg bg-green-500 px-4 py-1 font-bold text-white">
                        Edit
                    </Link>
                    <Link
                        href={`/dashboard/exercises/${exercise.id}`}
                        method="delete"
                        className="rounded-lg bg-red-500 px-4 py-1 font-bold text-white"
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ExerciseCard;

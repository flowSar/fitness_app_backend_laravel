import { ExerciseInterface } from '@/types';

function LinearExercisePreviewCard({ exercise }: { exercise: ExerciseInterface }) {
    return (
        <div
            key={exercise.id}
            className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700 md:h-[120px]"
        >
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative h-[120px] w-full flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 md:h-[150px] md:w-[240px]">
                    {exercise.image.includes('mp4') ? (
                        <video src={exercise.image} autoPlay muted playsInline className="h-full w-full object-cover"></video>
                    ) : (
                        <img src={exercise.image} alt="exercise image" className="h-full w-full object-cover" />
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-4">
                    {/* Exercise Info */}
                    <div className="mb-4 flex-1">
                        <h1 className="mb-2 text-xl font-semibold text-white">{exercise.name}</h1>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            {exercise.description.length > 200 ? `${exercise.description.substring(0, 100)}...` : exercise.description}
                        </p>
                        <div className="flex space-x-2">
                            <h3>Level:</h3>
                            <span>{exercise.level}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinearExercisePreviewCard;

import { ExerciseInterface } from '@/types';
import { useState } from 'react';
import { FaSquareMinus, FaSquarePlus } from 'react-icons/fa6';

type keyTypes = 'sets' | 'reps' | 'duration';

interface LinearExerciseCardProps {
    exercise: ExerciseInterface;
    exerciseConfigChange: ({ id, sets, reps, duration }: { id: string; sets: number; reps: number; duration: number }) => void;
}

function LinearExerciseCard({ exercise, exerciseConfigChange }: LinearExerciseCardProps) {
    const [exerciseConfig, setExerciseConfig] = useState({
        sets: 1,
        reps: 1,
        duration: 0,
    });

    const handExerciseConfigChange = (key: keyTypes, oper: string) => {
        if (oper === '+') {
            setExerciseConfig((old) => {
                const newConfig = { ...old, [key]: old[key] + 1 };
                exerciseConfigChange({ ...newConfig, id: exercise.id });
                return newConfig;
            });
        } else if (oper === '-') {
            setExerciseConfig((old) => {
                if (old[key] <= 1) {
                    return old;
                }
                const newConfig = { ...old, [key]: old[key] - 1 };
                exerciseConfigChange({ ...newConfig, id: exercise.id });
                return newConfig;
            });
        }
    };
    return (
        <div
            key={exercise.id}
            className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700 md:h-[150px]"
        >
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative h-[140px] w-full flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 md:h-[150px] md:w-[240px]">
                    <img src={exercise.image} alt="exercise image" className="h-full w-full object-cover" />
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-4">
                    {/* Exercise Info */}
                    <div className="mb-4 flex-1">
                        <h1 className="mb-2 text-xl font-semibold text-white">{exercise.name}</h1>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            {exercise.description.length > 200 ? `${exercise.description.substring(0, 100)}...` : exercise.description}
                        </p>
                    </div>

                    {/* Controls Section */}
                    <div className="flex flex-wrap gap-4 md:gap-6">
                        {/* Sets */}
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Sets</span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('sets', '-')}
                                >
                                    <FaSquareMinus size={28} />
                                </button>
                                <span className="min-w-[32px] text-center text-lg font-semibold text-white">{exerciseConfig.sets}</span>
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('sets', '+')}
                                >
                                    <FaSquarePlus size={28} />
                                </button>
                            </div>
                        </div>

                        {/* Reps */}
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Reps</span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('reps', '-')}
                                >
                                    <FaSquareMinus size={28} />
                                </button>
                                <span className="min-w-[32px] text-center text-lg font-semibold text-white">{exerciseConfig.reps}</span>
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('reps', '+')}
                                >
                                    <FaSquarePlus size={28} />
                                </button>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Duration</span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('duration', '-')}
                                >
                                    <FaSquareMinus size={28} />
                                </button>
                                <span className="min-w-[32px] text-center text-lg font-semibold text-white">{exerciseConfig.duration}s</span>
                                <button
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                    onClick={() => handExerciseConfigChange('duration', '+')}
                                >
                                    <FaSquarePlus size={28} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinearExerciseCard;

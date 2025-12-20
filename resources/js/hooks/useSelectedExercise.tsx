import { ExerciseInterface } from '@/types';
import { useEffect, useState } from 'react';

interface ExerciseConfig {
    id: string;
    sets: number;
    reps: number;
    duration: number;
}
// this hook will use generate selected exercises based of selected exercises Ids, and generate defualt config for each exercise

export default function useSelectedExercise(exercises: ExerciseInterface[]) {
    const [selectedExercises, setSelectedExercises] = useState<ExerciseInterface[]>([]);
    const [selectedExercisesConfig, setSelectedExercisesConfig] = useState<ExerciseConfig[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const selected = exercises.filter((exercise) => selectedIds.includes(exercise.id));
        setSelectedExercises(() => [...selected]);
        // generate exercises config for the first time, or update the config when selected changes
        if (selectedExercisesConfig.length === 0) {
            const selectedConfig = selected.map((exercise) => {
                return {
                    id: exercise.id,
                    sets: 1,
                    reps: 1,
                    duration: 0,
                };
            });
            setSelectedExercisesConfig([...selectedConfig]);
        } else {
            // if not the first time, when the selection change update the config array.
            // first filter remove unselected
            const newSelectedConfig = selectedExercisesConfig.filter((e) => selectedIds.includes(e.id));
            // compare and push new config for newly selected exercises

            if (selected.length !== newSelectedConfig.length) {
                newSelectedConfig.push({
                    id: selectedIds[selectedIds.length - 1],
                    sets: 1,
                    reps: 1,
                    duration: 0,
                });
            }

            setSelectedExercisesConfig([...newSelectedConfig]);
        }
    }, [exercises, selectedIds]);

    return { selectedExercises, selectedExercisesConfig, setSelectedExercises, setSelectedExercisesConfig, setSelectedIds };
}

import { ExerciseInterface } from '@/types';
import { ChangeEvent, useState } from 'react';

interface DialogProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onSelectedValue: (value: string[]) => void;
    exercises: ExerciseInterface[];
}

type keyTypes = 'sets' | 'reps' | 'duration';

function ExerciseSelectDialog({ dialogRef, onSelectedValue, exercises = [] }: DialogProps) {
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [exerciseConfig, setExerciseConfig] = useState({
        sets: 1,
        reps: 1,
        duration: 0,
    });
    const handleSelect = () => {
        onSelectedValue(selectedExercises);
        dialogRef.current?.close();
    };
    const closeDialog = () => {
        dialogRef.current?.close();
    };
    const handleCheckBoxSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.value;
        if (e.target.checked) {
            console.log('checked');
            setSelectedExercises((old) => [...old, id]);
        } else {
            const newArray = selectedExercises?.filter((item) => item !== id);
            setSelectedExercises((old) => [...newArray]);
        }
    };

    const handExerciseConfigChange = (key: keyTypes, oper: string) => {
        if (oper === '+') {
            // setExerciseConfig((old) => {
            //     const newConfig = { ...old, [key]: old[key] + 1 };
            //     exerciseConfigChange({ ...newConfig, id: exercise.id });
            //     return newConfig;
            // });
        } else if (oper === '-') {
            // setExerciseConfig((old) => {
            //     if (old[key] <= 1) {
            //         return old;
            //     }
            //     const newConfig = { ...old, [key]: old[key] - 1 };
            //     exerciseConfigChange({ ...newConfig, id: exercise.id });
            //     return newConfig;
            // });
        }
    };

    return (
        <dialog ref={dialogRef} className="items-center justify-center rounded-lg">
            <div className="dark:bg-spaceGray flex h-[700px] w-[800px] flex-col p-6 dark:text-white">
                <header className="h-8 text-center"> Exercises</header>
                <main className="flex-1 space-y-2">
                    {exercises.map((exercise) => {
                        return (
                            <div key={exercise.id} className="flex h-[100px] overflow-hidden rounded-lg bg-white/10 pr-4">
                                <div className="h-[100px] w-[200px] bg-blue-300">
                                    <img src={exercise.image} className="h-full w-full object-cover" alt="image" />
                                </div>
                                <div className="flex-1 p-4">
                                    <h1 className="text-lg font-semibold">{exercise.name}</h1>
                                    <p>{exercise.description.length > 70 ? `${exercise.description.substring(0, 70)}...` : exercise.description}</p>
                                </div>
                                <input id="checkbox" value={exercise.id} type="checkbox" className="self-center" onChange={handleCheckBoxSelect} />
                            </div>
                        );
                    })}
                </main>
                <footer className="flex justify-end gap-6">
                    <button onClick={closeDialog}>Cancel</button>
                    <button onClick={handleSelect}>select</button>
                </footer>
            </div>
        </dialog>
    );
}

export default ExerciseSelectDialog;

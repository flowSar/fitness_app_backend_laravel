import { ExerciseInterface } from '@/types';
import { ChangeEvent, useState } from 'react';

interface DialogProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onSelectedValue: (value: string[]) => void;
    exercises: ExerciseInterface[];
    sessionExercises?: string[];
}

function ExerciseSelectDialog({ dialogRef, onSelectedValue, exercises = [], sessionExercises = [] }: DialogProps) {
    const [selectedExercises, setSelectedExercises] = useState<string[]>(sessionExercises);

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
            setSelectedExercises((old) => [...old, id]);
        } else {
            const newArray = selectedExercises?.filter((item) => item !== id);
            setSelectedExercises((old) => [...newArray]);
        }
    };
    return (
        <dialog ref={dialogRef} className="items-center justify-center rounded-lg">
            <div className="flex h-[700px] w-[800px] flex-col p-6 pb-1 dark:bg-spaceGray dark:text-white">
                <header className="h-8 text-center"> Exercises</header>
                <main className="flex-1 space-y-2 overflow-y-scroll [scrollbar-width:none]">
                    {exercises.map((exercise) => {
                        return (
                            <div key={exercise.id} className="flex h-[100px] overflow-hidden rounded-lg bg-white/10 pr-4">
                                <div className="h-[100px] w-[200px] bg-blue-300">
                                    {exercise.image.includes('mp4') ? (
                                        <video src={exercise.image} autoPlay loop muted playsInline className="h-full w-full object-cover"></video>
                                    ) : (
                                        <img src={exercise.image} className="h-full w-full object-cover" alt="image" />
                                    )}
                                </div>
                                <div className="flex-1 p-4">
                                    <h1 className="text-lg font-semibold">{exercise.name}</h1>
                                    <p>{exercise.description.length > 70 ? `${exercise.description.substring(0, 70)}...` : exercise.description}</p>
                                </div>
                                <input
                                    id="checkbox"
                                    checked={selectedExercises.includes(exercise.id)}
                                    value={exercise.id}
                                    type="checkbox"
                                    className="self-center"
                                    onChange={handleCheckBoxSelect}
                                />
                            </div>
                        );
                    })}
                </main>

                <footer className="flex justify-end gap-6 p-6">
                    <button onClick={closeDialog}>Cancel</button>
                    <button onClick={handleSelect}>select</button>
                </footer>
            </div>
        </dialog>
    );
}

export default ExerciseSelectDialog;

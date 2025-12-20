import useTest from '@/hooks/useTest';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExerciseInterface } from '@/types';

interface State {
    name: string;
    email: string;
    password: string;
}

const exercise: ExerciseInterface = {
    name: 'name of the exercises',
    description: '',
    id: '019b0092-1631-7221-88cf-7dded85acb8c',
    image: 'https://i.pinimg.com/736x/c0/b6/ab/c0b6ab6776a90a69dc0df47591cdd174.jpg',
    video: '',
    notes: '',
    level: 'beginner',
};

type Action = { type: 'SET_NAmE'; payload: string } | { type: 'SET_EMAIL'; payload: string } | { type: 'SET_PASSWORD'; payload: string };

function TestPage() {
    // function reducer(sate: State, action: Action): State {
    //     return state;
    // }
    // const [state, displatch] = useReducer(reducer, {
    //     name: '',
    //     email: '',
    //     password: '',
    // });

    const { count, newCount, setCount } = useTest(0);

    return (
        <DashboardLayout>
            <div>
                <p>{count}</p>
                <p>{newCount}</p>
                <button
                    onClick={() => {
                        setCount((c: number) => c + 1);
                    }}
                >
                    Click
                </button>
            </div>
        </DashboardLayout>
    );
}

export default TestPage;

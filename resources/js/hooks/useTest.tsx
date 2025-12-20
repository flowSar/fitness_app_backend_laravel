import { useState } from 'react';

function useTest(d: number) {
    const [count, setCount] = useState(d);
    const [newCount, setNewCount] = useState(count);

    setNewCount((c) => c * 10);
    // setCount((c) => c * 10);

    return { count, newCount, setCount };
}

export default useTest;

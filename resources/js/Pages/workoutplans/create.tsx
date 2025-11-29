import InputError from '@/Components/InputError';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Textarea } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent } from 'react';

type InputKeyType = 'name' | 'description' | 'sessionsNumber' | 'level' | 'duration';

function create() {
    const { flush }: any = usePage().props;
    const { post, data, setData, errors, processing } = useForm({
        name: '',
        description: '',
        sessionsNumber: 1,
        image: '',
        level: 'Beginner',
        duration: 0.0,
    });

    const handleInputvalueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as InputKeyType;
        setData(key, e.target.value);
    };

    const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/dashboard/plans/');

        if (flush['success'] != null) {
            setData('name', '');
            setData('description', '');
            setData('sessionsNumber', 1);
            setData('image', '');
            setData('duration', 0);
        }
        // console.log(data.name);
        // console.log(data.description);
        // console.log(data.level);
        // console.log(data.duration);
        // console.log(data.sessionsNumber);
        // console.log(data.image);
    };

    console.log(`errors: ${errors.name} ${processing}`);

    return (
        <DashboardLayout>
            <div className="ml-10 px-10">
                <form className="w-2xl" onSubmit={handleFormSubmit}>
                    <div className="">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="mt-2 block w-full px-4 py-3 dark:bg-black/10"
                            placeholder="Plan Name"
                            value={data.name}
                            onChange={handleInputvalueChange}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="description">Description:</label>
                        <Textarea
                            id="description"
                            placeholder="Description"
                            className="mt-1 block w-full p-4 dark:bg-black/10"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={2}
                        ></Textarea>
                        <InputError message={errors.description} />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="sessionsNumber">Sessions Number:</label>
                        <input
                            id="sessionsNumber"
                            name="sessionsNumber"
                            type="number"
                            className="mt-2 block w-full px-4 py-3 dark:bg-black/10"
                            placeholder="SessionNumber"
                            value={data.sessionsNumber}
                            onChange={handleInputvalueChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="image">Image Url:</label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            className="mt-2 block w-full px-4 py-3 dark:bg-black/10"
                            placeholder="Image URL"
                            value={data.image}
                            onChange={handleInputvalueChange}
                        />
                        <InputError message={errors.image} />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="level">Level:</label>
                        <select value={data.level} className="block w-full py-3 dark:bg-black/10" onChange={(e) => setData('level', e.target.value)}>
                            <option value={'Beginner'} className="dark:bg-white/10 dark:text-black">
                                Beginner
                            </option>
                            <option value={'Intermediate'} className="dark:bg-white/10 dark:text-black">
                                Intermediate
                            </option>
                            <option value={'Advanced'} className="dark:bg-white/10 dark:text-black">
                                Advanced
                            </option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="duration">Duration:</label>
                        <input
                            id="duration"
                            name="duration"
                            type="number"
                            step="any"
                            className="mt-2 block w-full px-4 py-3 dark:bg-black/10"
                            placeholder="Workout Duration"
                            value={data.duration}
                            onChange={handleInputvalueChange}
                        />
                        <InputError message={errors.duration} />
                    </div>
                    <div className="mt-4 text-end">
                        <input
                            disabled={processing}
                            type="submit"
                            value={'create'}
                            className="cursor-pointer rounded-lg px-8 py-3 duration-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                        />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default create;

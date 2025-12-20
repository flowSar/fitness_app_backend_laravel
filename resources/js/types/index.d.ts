import { UUID } from 'crypto';
import { ReactNode } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface SessionInterface {
    id: UUID;
    name: string;
    complete?: boolean;
    progress?: number;
    duration?: number;
    plan_id?: UUID;
    session_exercises?: SessionExercises[];
}

interface SessionExercises {
    id: UUID;
    name: string;
    description: string;
    notes: string;
    image: string;
    video: string;
    level: string;
    complete: boolean;
    sets: number;
    reps: number;
    duration: number;
    exercise: ExerciseInterface;
}

export interface PlanInterafce {
    id: UUID;
    name: string;
    description: string;
    sessions_number: number;
    image: string;
    duration: number;
    level: string;
    category: string;
    sessions: SessionInterface[];
}

export interface ExerciseInterface {
    id: UUID;
    name: string;
    description: string;
    notes: string;
    image: string;
    video: string;
    level: string;
}

export interface SubMenuItem {
    id: number;
    title: string;
    href: string;
    icon?: ReactNode;
}

export interface MenuItem {
    id: number;
    title: string;
    href?: string;
    icon?: ReactNode;
    open?: boolean;
    subTree?: SubMenuItem[];
}

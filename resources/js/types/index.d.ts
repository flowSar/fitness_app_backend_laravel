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

export interface PlanInterafce {
    id: UUID;
    name: string;
    description: string;
    sessionsNumber: number;
    image: string;
    duration: number;
    level: String;
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

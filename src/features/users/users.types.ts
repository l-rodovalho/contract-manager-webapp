export type UserRole = 'ADMIN' | 'MANAGER' | 'VIEWER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
}
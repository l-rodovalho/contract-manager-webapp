import { useQuery } from '@tanstack/react-query';
import type { User } from '../users.types';
// import { api } from '../../../lib/api';

const MOCK_USERS: User[] = [
    { id: 'USR-001', name: 'Ana Silva', email: 'ana.silva@contractos.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-05-05T08:30:00Z' },
    { id: 'USR-002', name: 'Carlos Mendes', email: 'carlos.mendes@contractos.com', role: 'MANAGER', status: 'ACTIVE', lastLogin: '2026-05-04T14:15:00Z' },
    { id: 'USR-003', name: 'Beatriz Souza', email: 'beatriz.souza@contractos.com', role: 'VIEWER', status: 'INACTIVE', lastLogin: '2026-04-20T09:00:00Z' },
];

const fetchUsers = async (): Promise<User[]> => {
    // const response = await api.get<User[]>('/users');
    // return response.data;

    return new Promise((resolve) => setTimeout(() => resolve(MOCK_USERS), 700));
};

export function useUsersQuery() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
    });
}
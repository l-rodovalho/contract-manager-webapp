import { useQuery } from '@tanstack/react-query';
import type { User } from '../users.types';
import { api } from '../../../lib/api';

const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export function useUsersQuery() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
}
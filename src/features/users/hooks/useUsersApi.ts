import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserRole, UserStatus } from '../users.types';
import { api } from '../../../lib/api';

// ==================== TYPES ====================

interface CreateUserBody {
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

interface UpdateUserBody {
    name?: string;
    email?: string;
    role?: UserRole;
    status?: UserStatus;
    version: number;
}

// ==================== API CALLS ====================

const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

const fetchUser = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

const createUser = async (body: CreateUserBody): Promise<User> => {
    const response = await api.post<User>('/users', body);
    return response.data;
};

const updateUser = async (id: number, body: UpdateUserBody): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, body);
    return response.data;
};

const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};

// ==================== HOOKS ====================

export function useUsersQuery() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
}

export function useUserQuery(id: number) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => fetchUser(id),
        enabled: !!id,
    });
}

export function useCreateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: UpdateUserBody }) =>
            updateUser(id, body),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['users', id] });
        },
    });
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

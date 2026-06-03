import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Customer } from '../customers.types';
import { api } from '../../../lib/api';

// ==================== TYPES ====================

interface CreateCustomerBody {
    corporateName: string;
    tradeName: string;
    documentId: string;
    contactEmail: string;
}

interface UpdateCustomerBody {
    corporateName?: string;
    tradeName?: string;
    documentId?: string;
    contactEmail?: string;
    version: number;
}

// ==================== API CALLS ====================

const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
};

const fetchCustomer = async (id: number): Promise<Customer> => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
};

const createCustomer = async (body: CreateCustomerBody): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', body);
    return response.data;
};

const updateCustomer = async (id: number, body: UpdateCustomerBody): Promise<Customer> => {
    const response = await api.patch<Customer>(`/customers/${id}`, body);
    return response.data;
};

const cancelCustomer = async (id: number): Promise<void> => {
    await api.delete(`/customers/${id}`);
};

// ==================== HOOKS ====================

export function useCustomersQuery() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });
}

export function useCustomerQuery(id: number) {
    return useQuery({
        queryKey: ['customers', id],
        queryFn: () => fetchCustomer(id),
        enabled: !!id,
    });
}

export function useCreateCustomerMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
}

export function useUpdateCustomerMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: UpdateCustomerBody }) =>
            updateCustomer(id, body),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            queryClient.invalidateQueries({ queryKey: ['customers', id] });
        },
    });
}

export function useDeleteCustomerMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
}

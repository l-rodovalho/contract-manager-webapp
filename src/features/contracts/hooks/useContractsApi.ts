import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Contract, ContractStatus } from '../contracts.types';
import { api } from '../../../lib/api';

// ==================== TYPES ====================

interface CreateContractBody {
    customerId: number;
    managerId: number;
    title: string;
    value: number;
    startDate: string;
    endDate: string;
    status?: ContractStatus;
}

interface UpdateContractBody {
    managerId?: number;
    title?: string;
    value?: number;
    startDate?: string;
    endDate?: string;
    status?: ContractStatus;
    version: number;
}

// ==================== API CALLS ====================

const fetchContracts = async (): Promise<Contract[]> => {
    const response = await api.get<Contract[]>('/contracts');
    return response.data;
};

const fetchContract = async (id: number): Promise<Contract> => {
    const response = await api.get<Contract>(`/contracts/${id}`);
    return response.data;
};

const createContract = async (body: CreateContractBody): Promise<Contract> => {
    const response = await api.post<Contract>('/contracts', body);
    return response.data;
};

const updateContract = async (id: number, body: UpdateContractBody): Promise<Contract> => {
    const response = await api.patch<Contract>(`/contracts/${id}`, body);
    return response.data;
};

const cancelContract = async (id: number): Promise<void> => {
    await api.delete(`/contracts/${id}`);
};

// ==================== HOOKS ====================

export function useContractsQuery() {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: fetchContracts,
    });
}

export function useContractQuery(id: number) {
    return useQuery({
        queryKey: ['contracts', id],
        queryFn: () => fetchContract(id),
        enabled: !!id,
    });
}

export function useCreateContractMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createContract,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        },
    });
}

export function useUpdateContractMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: UpdateContractBody }) =>
            updateContract(id, body),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
            queryClient.invalidateQueries({ queryKey: ['contracts', id] });
        },
    });
}

export function useCancelContractMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelContract,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        },
    });
}

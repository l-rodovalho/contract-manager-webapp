import { useQuery } from '@tanstack/react-query';
import type { Contract } from '../contracts.types';
import { api } from '../../../lib/api';

const fetchContracts = async (): Promise<Contract[]> => {
    const response = await api.get<Contract[]>('/contracts');
    return response.data;
};

export function useContractsQuery() {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: fetchContracts,
    });
}
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { Contract } from '../contracts.types';

const fetchContracts = async (): Promise<Contract[]> => {
    const response = await api.get<Contract[]>('/contracts');
    return response.data;
};
export function useContractsQuery() {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: fetchContracts,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
}
import { useQuery } from '@tanstack/react-query';
import type { Customer } from '../customers.types';
import { api } from '../../../lib/api';

const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
};

export function useCustomersQuery() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });
}
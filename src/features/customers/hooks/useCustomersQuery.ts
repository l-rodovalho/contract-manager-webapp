import { useQuery } from '@tanstack/react-query';
import type { Customer } from '../customers.types';
// import { api } from '../../../lib/api';

const fetchCustomers = async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
        { id: 'CUST-01', corporateName: 'Acme Corporation LTDA', tradeName: 'Acme Corp', documentId: '12.345.678/0001-99', contactEmail: 'legal@acme.com', status: 'ACTIVE' },
        { id: 'CUST-02', corporateName: 'Technology Flow S.A', tradeName: 'TechFlow', documentId: '98.765.432/0001-11', contactEmail: 'contracts@techflow.io', status: 'ACTIVE' },
    ];
};

export function useCustomersQuery() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
    });
}
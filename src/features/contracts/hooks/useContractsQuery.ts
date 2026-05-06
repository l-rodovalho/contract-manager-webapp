import { useQuery } from '@tanstack/react-query';
import type { Contract } from '../contracts.types';
// import { api } from '../../../lib/api';

const MOCK_CONTRACTS: Contract[] = [
    { id: 'CTR-001', customerName: 'Acme Corp', title: 'Enterprise SLA', value: 120000, startDate: '2025-01-10', endDate: '2026-01-10', status: 'ACTIVE' },
    { id: 'CTR-002', customerName: 'TechFlow', title: 'Software License', value: 45000, startDate: '2026-03-01', endDate: '2027-03-01', status: 'PENDING' },
    { id: 'CTR-003', customerName: 'Globex', title: 'Consulting Retainer', value: 85000, startDate: '2025-05-15', endDate: '2026-05-15', status: 'EXPIRING' },
    { id: 'CTR-004', customerName: 'Initech', title: 'Maintenance Support', value: 32000, startDate: '2024-02-01', endDate: '2025-02-01', status: 'EXPIRED' },
];

const fetchContracts = async (): Promise<Contract[]> => {
    // const response = await api.get<Contract[]>('/contracts');
    // return response.data;

    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CONTRACTS), 800));
};

export function useContractsQuery() {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: fetchContracts,
        staleTime: 1000 * 60 * 5,
    });
}
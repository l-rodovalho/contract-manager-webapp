export type ContractStatus = 'ACTIVE' | 'PENDING' | 'EXPIRING' | 'EXPIRED';

export interface Contract {
    id: string;
    customerName: string;
    title: string;
    value: number;
    startDate: string;
    endDate: string;
    status: ContractStatus;
}
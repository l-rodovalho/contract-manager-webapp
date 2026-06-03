export type ContractStatus = 'ACTIVE' | 'PENDING' | 'EXPIRING' | 'EXPIRED';

export interface Contract {
    id: number;
    customerId: number;
    managerId: number;
    title: string;
    value: number;
    startDate: Date;
    endDate: Date;
    status: ContractStatus;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
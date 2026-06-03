export type CustomerStatus = 'ACTIVE' | 'INACTIVE';

export interface Customer {
    id: number;
    corporateName: string;
    tradeName: string;
    documentId: string;
    contactEmail: string;
    status: CustomerStatus;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
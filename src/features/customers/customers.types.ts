export interface Customer {
    id: string;
    corporateName: string;
    tradeName: string;
    documentId: string;
    contactEmail: string;
    status: 'ACTIVE' | 'INACTIVE';
}
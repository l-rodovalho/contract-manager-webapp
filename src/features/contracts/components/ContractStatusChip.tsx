import { Chip } from '@mui/material';
import type { ContractStatus } from '../contracts.types';

interface StatusChipProps {
    status: ContractStatus;
}

export function ContractStatusChip({ status }: StatusChipProps) {
    const config: Record<ContractStatus, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
        ACTIVE: { label: 'Ativo', color: 'success' },
        EXPIRING: { label: 'A Vencer', color: 'warning' },
        EXPIRED: { label: 'Expirado', color: 'error' },
        PENDING: { label: 'Pendente', color: 'default' },
    };

    const { label, color } = config[status];

    return (
        <Chip
            label={label}
            color={color}
            size="small"
            sx={{ fontWeight: 600, borderRadius: 2, px: 1 }}
        />
    );
}
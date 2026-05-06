import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import { DataTable } from '../../components/ui/DataTable';
import type { TableColumn } from '../../components/ui/DataTable';
import { useCustomersQuery } from './hooks/useCustomersQuery';
import type { Customer } from './customers.types';

export function CustomersList() {
    const { data: customers, isLoading, isError } = useCustomersQuery();

    const columns: TableColumn<Customer>[] = [
        { id: 'documentId', label: 'CNPJ', propName: 'documentId' },
        { id: 'tradeName', label: 'Nome Fantasia', propName: 'tradeName' },
        { id: 'corporateName', label: 'Razão Social', propName: 'corporateName' },
        { id: 'contactEmail', label: 'E-mail de Contato', propName: 'contactEmail' },
        {
            id: 'status',
            label: 'Status',
            render: (row) => (
                <Chip
                    label={row.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                    color={row.status === 'ACTIVE' ? 'success' : 'default'}
                    size="small"
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                />
            )
        },
        {
            id: 'actions',
            label: 'Ações',
            align: 'right',
            render: () => (
                <IconButton size="small">
                    <MoreVert fontSize="small" />
                </IconButton>
            )
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h1" color="text.primary">Clientes</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        Gestão da carteira de clientes B2B.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />}>
                    Novo Cliente
                </Button>
            </Box>

            <DataTable
                columns={columns}
                data={customers}
                isLoading={isLoading}
                isError={isError}
                emptyMessage="Nenhum cliente cadastrado."
            />
        </Box>
    );
}
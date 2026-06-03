import { Box, Typography, Button, IconButton, Chip, Menu, MenuItem } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import { DataTable } from '../../components/ui/DataTable';
import type { TableColumn } from '../../components/ui/DataTable';
import { useCustomersQuery } from './hooks/useCustomersApi';
import type { Customer } from './customers.types';
import { useState } from 'react';
import { CustomerViewDialog } from './components/CustomerViewDialog';
import { CustomerEditDialog } from './components/CustomerEditDialog';
import { CustomerCreateDialog } from './components/CustomerCreateDialog';

export function CustomersList() {
    const { data: customers, isLoading, isError } = useCustomersQuery();

    const [menuTrigger, setMenuTrigger] = useState<null | HTMLElement>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const isMenuOpen = Boolean(menuTrigger);

    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, row: Customer) => {
        setMenuTrigger(event.currentTarget);
        setSelectedCustomer(row);
    };
    const handleCloseMenu = () => setMenuTrigger(null);

    const handleOpenView = () => {
        handleCloseMenu();
        setViewOpen(true);
    };
    const handleOpenEdit = () => {
        handleCloseMenu();
        setEditOpen(true);
    };
    const handleViewToEdit = () => {
        setViewOpen(false);
        setEditOpen(true);
    };

    const handleOpenCreate = () => {
        setCreateOpen(true);
    };

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
            render: (row) => (
                <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)} id={`customer-menu-btn-${row.id}`}>
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
                        Gestão da carteira de clientes.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate}>
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

            <Menu
                anchorEl={menuTrigger}
                open={isMenuOpen}
                onClose={handleCloseMenu}
                elevation={2}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenView} sx={{ fontSize: '0.875rem' }}>Visualizar Detalhes</MenuItem>
                <MenuItem onClick={handleOpenEdit} sx={{ fontSize: '0.875rem' }}>Editar Cliente</MenuItem>
            </Menu>

            <CustomerViewDialog
                open={viewOpen}
                customer={selectedCustomer}
                onClose={() => setViewOpen(false)}
                onEdit={handleViewToEdit}
            />

            <CustomerEditDialog
                open={editOpen}
                customer={selectedCustomer}
                onClose={() => setEditOpen(false)}
            />

            <CustomerCreateDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </Box>
    );
}
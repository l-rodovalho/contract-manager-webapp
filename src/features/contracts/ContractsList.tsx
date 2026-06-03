import { useState, useMemo } from 'react';
import {
    Box, Typography, Button, Paper, IconButton, InputBase, Toolbar, Menu, MenuItem
} from '@mui/material';
import { Add, MoreVert, Search, FilterList } from '@mui/icons-material';

import { useContractsQuery } from './hooks/useContractsApi';
import { ContractStatusChip } from './components/ContractStatusChip';
import { ContractViewDialog } from './components/ContractViewDialog';
import { ContractEditDialog } from './components/ContractEditDialog';
import { DataTable } from '../../components/ui/DataTable';
import type { TableColumn } from '../../components/ui/DataTable';
import type { Contract } from './contracts.types';
import { useCustomersQuery } from '../customers/hooks/useCustomersQuery';
import { useUsersQuery } from '../users/hooks/useUsersQuery';

export function ContractsList() {
    const { data: contracts, isLoading: isLoadingContracts, isError: isErrorContracts } = useContractsQuery();
    const { data: customers, isLoading: isLoadingCustomers, isError: isErrorCustomers } = useCustomersQuery();
    const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsersQuery();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const openActionMenu = Boolean(anchorEl);

    // Dialogs
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, row: Contract) => {
        setAnchorEl(event.currentTarget);
        setSelectedContract(row);
    };
    const handleCloseMenu = () => setAnchorEl(null);

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

    const handleSave = (updated: Partial<Contract>) => {
        console.log('Saving contract changes:', updated);
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const columns = useMemo<TableColumn<Contract>[]>(() => [
        {
            id: 'id',
            label: 'ID',
            render: (row) => (
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    {row.id}
                </Typography>
            )
        },
        {
            id: 'customerName',
            label: 'Cliente',
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {customers?.find((customer) => customer.id === row.customerId)?.tradeName || customers?.find((customer) => customer.id === row.customerId)?.corporateName || `Cliente ${row.customerId}`}
                </Typography>
            )
        },
        { id: 'title', label: 'Título', propName: 'title' },
        {
            id: 'value',
            label: 'Valor',
            render: (row) => formatCurrency(row.value)
        },
        {
            id: 'managerName',
            label: 'Responsável',
            render: (row) => users?.find((user) => user.id === row.managerId)?.name || `Usuário ${row.managerId}`
        },
        {
            id: 'status',
            label: 'Status',
            render: (row) => <ContractStatusChip status={row.status} />
        },
        {
            id: 'endDate',
            label: 'Vencimento',
            render: (row) => new Intl.DateTimeFormat('pt-BR').format(new Date(row.endDate))
        },
        {
            id: 'actions',
            label: 'Ações',
            align: 'right',
            render: (row) => (
                <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)} id={`contract-menu-btn-${row.id}`}>
                    <MoreVert fontSize="small" />
                </IconButton>
            )
        }
    ], [customers, users]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h1" color="text.primary">Contratos</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        Gerencie o ciclo de vida e a vigência dos acordos.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />}>
                    Novo Contrato
                </Button>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>

                <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: 2, px: 2, py: 0.5, flex: 1, maxWidth: 400 }}>
                        <Search sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
                        <InputBase placeholder="Buscar por cliente ou ID..." sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button startIcon={<FilterList />} color="inherit" sx={{ color: 'text.secondary' }}>Filtros</Button>
                </Toolbar>

                <DataTable
                    columns={columns}
                    data={contracts}
                    isLoading={isLoadingContracts || isLoadingCustomers || isLoadingUsers}
                    isError={isErrorContracts || isErrorCustomers || isErrorUsers}
                    emptyMessage="Nenhum contrato ativo encontrado."
                />
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={openActionMenu}
                onClose={handleCloseMenu}
                elevation={2}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenView} sx={{ fontSize: '0.875rem' }}>Visualizar Detalhes</MenuItem>
                <MenuItem onClick={handleOpenEdit} sx={{ fontSize: '0.875rem' }}>Editar Contrato</MenuItem>
                <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '0.875rem', color: 'error.main' }}>Cancelar Contrato</MenuItem>
            </Menu>

            <ContractViewDialog
                open={viewOpen}
                contract={selectedContract}
                customer={customers?.find((customer) => customer.id === selectedContract?.customerId)}
                user={users?.find((user) => user.id === selectedContract?.managerId)}
                onClose={() => setViewOpen(false)}
                onEdit={handleViewToEdit}
            />
            <ContractEditDialog
                open={editOpen}
                contract={selectedContract}
                customers={customers}
                users={users}
                onClose={() => setEditOpen(false)}
                onSave={handleSave}
            />
        </Box>
    );
}
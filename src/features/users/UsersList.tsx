import { useMemo } from 'react';
import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import { Add, MoreVert, AdminPanelSettings, ManageAccounts, Visibility } from '@mui/icons-material';

import { DataTable } from '../../components/ui/DataTable';
import type { TableColumn } from '../../components/ui/DataTable';
import { useUsersQuery } from './hooks/useUsersQuery';
import type { User, UserRole } from './users.types';

const RoleChip = ({ role }: { role: UserRole }) => {
    const config = {
        ADMIN: { label: 'Administrador', icon: <AdminPanelSettings fontSize="small" />, color: 'error' as const },
        MANAGER: { label: 'Gestor', icon: <ManageAccounts fontSize="small" />, color: 'primary' as const },
        VIEWER: { label: 'Visualizador', icon: <Visibility fontSize="small" />, color: 'default' as const },
    };
    const { label, icon, color } = config[role];

    return <Chip icon={icon} label={label} color={color} size="small" variant="outlined" sx={{ fontWeight: 500 }} />;
};

export function UsersList() {
    const { data: users, isLoading, isError } = useUsersQuery();

    const columns = useMemo<TableColumn<User>[]>(() => [
        {
            id: 'name',
            label: 'Nome',
            render: (row) => <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.name}</Typography>
        },
        { id: 'email', label: 'E-mail', propName: 'email' },
        {
            id: 'role',
            label: 'Nível de Acesso',
            render: (row) => <RoleChip role={row.role} />
        },
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
            id: 'lastLogin',
            label: 'Último Acesso',
            render: (row) => new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }).format(new Date(row.lastLogin))
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
    ], []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h1" color="text.primary">Usuários do Sistema</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        Controle de acessos e permissões da plataforma.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />}>
                    Novo Usuário
                </Button>
            </Box>

            <DataTable
                columns={columns}
                data={users}
                isLoading={isLoading}
                isError={isError}
                emptyMessage="Nenhum usuário encontrado."
            />
        </Box>
    );
}
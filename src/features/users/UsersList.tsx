import { useMemo } from 'react';
import { Box, Typography, Button, IconButton, Chip, Menu, MenuItem } from '@mui/material';
import { Add, MoreVert, AdminPanelSettings, ManageAccounts, Visibility } from '@mui/icons-material';

import { DataTable } from '../../components/ui/DataTable';
import type { TableColumn } from '../../components/ui/DataTable';
import { useUsersQuery } from './hooks/useUsersApi';
import type { User, UserRole } from './users.types';
import { useState } from 'react';
import { UserViewDialog } from './components/UserViewDialog';
import { UserCreateDialog } from './components/UserCreateDialog';
import { UserEditDialog } from './components/UserEditDialog';

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

    const [menuTrigger, setMenuTrigger] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const isMenuOpen = Boolean(menuTrigger);

    const [viewOpen, setViewOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, row: User) => {
        setMenuTrigger(event.currentTarget);
        setSelectedUser(row);
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
            render: (row) => row.lastLogin ? new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }).format(new Date(row.lastLogin)) : '-'
        },
        {
            id: 'actions',
            label: 'Ações',
            align: 'right',
            render: (row) => (
                <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)} id={`user-menu-btn-${row.id}`}>
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
                <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate}>
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

            <Menu
                anchorEl={menuTrigger}
                open={isMenuOpen}
                onClose={handleCloseMenu}
                elevation={2}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenView} sx={{ fontSize: '0.875rem' }}>Visualizar Detalhes</MenuItem>
                <MenuItem onClick={handleOpenEdit} sx={{ fontSize: '0.875rem' }}>Editar Usuário</MenuItem>
            </Menu>

            <UserViewDialog
                open={viewOpen}
                user={selectedUser}
                onClose={() => setViewOpen(false)}
                onEdit={handleViewToEdit}
            />

            <UserEditDialog
                open={editOpen}
                user={selectedUser}
                onClose={() => setEditOpen(false)}
            />

            <UserCreateDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </Box>
    );
}
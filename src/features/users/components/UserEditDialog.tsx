import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Divider, TextField,
    IconButton, CircularProgress, Select, MenuItem as SelectItem, FormControl, InputLabel,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { User, UserRole, UserStatus } from '../users.types';
import { useUpdateUserMutation } from '../hooks/useUsersApi';

interface UserEditDialogProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSuccess?: () => void;
}

const ROLES: { value: UserRole; label: string }[] = [
    { value: 'VIEWER', label: 'Visualizador' },
    { value: 'MANAGER', label: 'Gestor' },
    { value: 'ADMIN', label: 'Administrador' },
];

const STATUSES: { value: UserStatus; label: string }[] = [
    { value: 'ACTIVE', label: 'Ativo' },
    { value: 'INACTIVE', label: 'Inativo' },
];

export function UserEditDialog({ open, user, onClose, onSuccess }: UserEditDialogProps) {
    const [form, setForm] = useState<Partial<User>>({});
    const updateUser = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            });
        }
    }, [user]);

    if (!user) return null;

    const handleChange = (field: keyof User, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updateUser.mutate(
            {
                id: user.id,
                body: {
                    name: form.name,
                    email: form.email,
                    role: form.role,
                    status: form.status,
                    version: user.version,
                },
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                },
            }
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Editar Usuário</Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{user.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="user-edit-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="user-edit-name"
                    label="Nome Completo"
                    fullWidth
                    value={form.name ?? ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    size="small"
                />

                <TextField
                    id="user-edit-email"
                    label="E-mail"
                    fullWidth
                    type="email"
                    value={form.email ?? ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    size="small"
                />

                <FormControl fullWidth size="small">
                    <InputLabel id="user-edit-role-label">Nível de Acesso</InputLabel>
                    <Select
                        labelId="user-edit-role-label"
                        id="user-edit-role"
                        value={form.role ?? ''}
                        label="Nível de Acesso"
                        onChange={(e) => handleChange('role', e.target.value as UserRole)}
                    >
                        {ROLES.map((r) => (
                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel id="user-edit-status-label">Status</InputLabel>
                    <Select
                        labelId="user-edit-status-label"
                        id="user-edit-status"
                        value={form.status ?? ''}
                        label="Status"
                        onChange={(e) => handleChange('status', e.target.value as UserStatus)}
                    >
                        {STATUSES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="user-edit-cancel-btn" disabled={updateUser.isPending}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={updateUser.isPending ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    disabled={updateUser.isPending}
                    id="user-edit-save-btn"
                >
                    Salvar Alterações
                </Button>
            </DialogActions>
        </Dialog>
    );
}

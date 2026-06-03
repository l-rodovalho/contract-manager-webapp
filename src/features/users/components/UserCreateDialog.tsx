import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Divider, TextField,
    IconButton, CircularProgress, Select, MenuItem as SelectItem, FormControl, InputLabel,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { User, UserRole } from '../users.types';
import { useCreateUserMutation } from '../hooks/useUsersApi';

interface UserCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const ROLES: { value: UserRole; label: string }[] = [
    { value: 'VIEWER', label: 'Visualizador' },
    { value: 'MANAGER', label: 'Gestor' },
    { value: 'ADMIN', label: 'Administrador' },
];

export function UserCreateDialog({ open, onClose, onSuccess }: UserCreateDialogProps) {
    const [form, setForm] = useState<Partial<User>>({ role: 'VIEWER', status: 'ACTIVE' });
    const createUser = useCreateUserMutation();

    useEffect(() => {
        if (open) {
            setForm({ role: 'VIEWER', status: 'ACTIVE' });
        }
    }, [open]);

    const handleChange = (field: keyof User, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        createUser.mutate(
            {
                name: form.name!,
                email: form.email!,
                role: form.role || 'VIEWER',
                status: 'ACTIVE',
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                },
            }
        );
    };

    const isValid = !!form.name && !!form.email;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Novo Usuário</Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="user-create-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="user-create-name"
                    label="Nome Completo"
                    fullWidth
                    required
                    value={form.name ?? ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    size="small"
                />

                <TextField
                    id="user-create-email"
                    label="E-mail"
                    fullWidth
                    type="email"
                    required
                    value={form.email ?? ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    size="small"
                />

                <FormControl fullWidth size="small" required>
                    <InputLabel id="user-create-role-label">Nível de Acesso</InputLabel>
                    <Select
                        labelId="user-create-role-label"
                        id="user-create-role"
                        value={form.role ?? 'VIEWER'}
                        label="Nível de Acesso"
                        onChange={(e) => handleChange('role', e.target.value as UserRole)}
                    >
                        {ROLES.map((r) => (
                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="user-create-cancel-btn" disabled={createUser.isPending}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={createUser.isPending ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    disabled={createUser.isPending || !isValid}
                    id="user-create-save-btn"
                >
                    Criar Usuário
                </Button>
            </DialogActions>
        </Dialog>
    );
}

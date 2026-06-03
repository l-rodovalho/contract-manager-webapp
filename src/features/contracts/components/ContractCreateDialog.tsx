import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider, TextField,
    Select, MenuItem as SelectItem, FormControl, InputLabel, IconButton,
    InputAdornment, CircularProgress,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { Contract, ContractStatus } from '../contracts.types';
import type { User } from '../../users/users.types';
import type { Customer } from '../../customers/customers.types';
import { ContractStatusChip } from './ContractStatusChip';
import { useCreateContractMutation } from '../hooks/useContractsApi';
import { toInputDate } from '../../../lib/dateUtils';

interface ContractCreateDialogProps {
    open: boolean;
    customers: Customer[] | undefined;
    users: User[] | undefined;
    onClose: () => void;
    onSuccess?: () => void;
}

const CONTRACT_STATUSES: { value: ContractStatus; label: string }[] = [
    { value: 'ACTIVE', label: 'Ativo' },
    { value: 'PENDING', label: 'Pendente' },
];

export function ContractCreateDialog({ open, customers, users, onClose, onSuccess }: ContractCreateDialogProps) {
    const [form, setForm] = useState<Partial<Contract>>({ status: 'PENDING' });
    const createContract = useCreateContractMutation();

    useEffect(() => {
        if (open) {
            setForm({ status: 'PENDING' });
        }
    }, [open]);

    const handleChange = (field: keyof Contract, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        createContract.mutate(
            {
                customerId: form.customerId!,
                title: form.title,
                managerId: form.managerId,
                value: form.value !== undefined ? Number(form.value) : 0,
                startDate: form.startDate ? toInputDate(form.startDate) : undefined,
                endDate: form.endDate ? toInputDate(form.endDate) : undefined,
                status: form.status || 'PENDING',
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                },
            }
        );
    };

    const isValid = !!form.title && !!form.managerId && form.value !== undefined && !!form.startDate && !!form.endDate;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Novo Contrato</Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="contract-create-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="contract-create-title"
                    label="Título do Contrato"
                    fullWidth
                    required
                    value={form.title ?? ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    size="small"
                />

                <FormControl fullWidth size="small" required>
                    <InputLabel id="contract-create-customer-label">Cliente</InputLabel>
                    <Select
                        labelId="contract-create-customer-label"
                        id="contract-create-customer"
                        value={form.customerId ?? ''}
                        label="Cliente"
                        onChange={(e) => handleChange('customerId', e.target.value)}
                    >
                        {customers?.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.tradeName}</SelectItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" required>
                    <InputLabel id="contract-create-manager-label">Responsável</InputLabel>
                    <Select
                        labelId="contract-create-manager-label"
                        id="contract-create-manager"
                        value={form.managerId ?? ''}
                        label="Responsável"
                        onChange={(e) => handleChange('managerId', e.target.value)}
                    >
                        {users?.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="contract-create-value"
                    label="Valor"
                    fullWidth
                    required
                    type="number"
                    value={form.value ?? ''}
                    onChange={(e) => handleChange('value', parseFloat(e.target.value))}
                    size="small"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        },
                    }}
                />

                <FormControl fullWidth size="small" required>
                    <InputLabel id="contract-create-status-label">Status Inicial</InputLabel>
                    <Select
                        labelId="contract-create-status-label"
                        id="contract-create-status"
                        value={form.status ?? 'PENDING'}
                        label="Status Inicial"
                        onChange={(e) => handleChange('status', e.target.value as ContractStatus)}
                        renderValue={(value) => <ContractStatusChip status={value as ContractStatus} />}
                    >
                        {CONTRACT_STATUSES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        id="contract-create-start-date"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        required
                        size="small"
                        value={form.startDate ? toInputDate(form.startDate) : ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        id="contract-create-end-date"
                        label="Data de Vencimento"
                        type="date"
                        fullWidth
                        required
                        size="small"
                        value={form.endDate ? toInputDate(form.endDate) : ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="contract-create-cancel-btn" disabled={createContract.isPending}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={createContract.isPending ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    disabled={createContract.isPending || !isValid}
                    id="contract-create-save-btn"
                >
                    Criar Contrato
                </Button>
            </DialogActions>
        </Dialog>
    );
}
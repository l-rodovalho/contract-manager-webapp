import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider, TextField,
    Select, MenuItem as SelectItem, FormControl, InputLabel, IconButton,
    InputAdornment,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { Contract, ContractStatus } from '../contracts.types';
import type { Customer } from '../../customers/customers.types';
import type { User } from '../../users/users.types';
import { ContractStatusChip } from './ContractStatusChip';

interface ContractEditDialogProps {
    open: boolean;
    contract: Contract | null;
    customers: Customer[] | undefined;
    users: User[] | undefined;
    onClose: () => void;
    onSave: (updated: Partial<Contract>) => void;
}

const CONTRACT_STATUSES: { value: ContractStatus; label: string }[] = [
    { value: 'ACTIVE', label: 'Ativo' },
    { value: 'PENDING', label: 'Pendente' },
    { value: 'EXPIRING', label: 'A Vencer' },
    { value: 'EXPIRED', label: 'Expirado' },
];

function toInputDate(date: Date | string): string {
    return new Date(date).toISOString().slice(0, 10);
}

export function ContractEditDialog({ open, contract, customers, users, onClose, onSave }: ContractEditDialogProps) {
    const [form, setForm] = useState<Partial<Contract>>({});

    useEffect(() => {
        if (contract) {
            setForm({
                title: contract.title,
                value: contract.value,
                status: contract.status,
                customerId: contract.customerId,
                managerId: contract.managerId,
                startDate: contract.startDate,
                endDate: contract.endDate,
            });
        }
    }, [contract]);

    if (!contract) return null;

    const handleChange = (field: keyof Contract, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Editar Contrato</Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{contract.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="contract-edit-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="contract-edit-title"
                    label="Título do Contrato"
                    fullWidth
                    value={form.title ?? ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    size="small"
                />

                <FormControl fullWidth size="small">
                    <InputLabel id="contract-edit-customer-label">Cliente</InputLabel>
                    <Select
                        labelId="contract-edit-customer-label"
                        id="contract-edit-customer"
                        value={form.customerId ?? ''}
                        label="Cliente"
                        onChange={(e) => handleChange('customerId', e.target.value)}
                    >
                        {customers?.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.tradeName || c.corporateName}
                            </SelectItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                    <InputLabel id="contract-edit-manager-label">Responsável</InputLabel>
                    <Select
                        labelId="contract-edit-manager-label"
                        id="contract-edit-manager"
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
                    id="contract-edit-value"
                    label="Valor"
                    fullWidth
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

                <FormControl fullWidth size="small">
                    <InputLabel id="contract-edit-status-label">Status</InputLabel>
                    <Select
                        labelId="contract-edit-status-label"
                        id="contract-edit-status"
                        value={form.status ?? ''}
                        label="Status"
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
                        id="contract-edit-start-date"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        size="small"
                        value={form.startDate ? toInputDate(form.startDate) : ''}
                        onChange={(e) => handleChange('startDate', new Date(e.target.value))}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        id="contract-edit-end-date"
                        label="Data de Vencimento"
                        type="date"
                        fullWidth
                        size="small"
                        value={form.endDate ? toInputDate(form.endDate) : ''}
                        onChange={(e) => handleChange('endDate', new Date(e.target.value))}
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="contract-edit-cancel-btn">
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={<Save />}
                    id="contract-edit-save-btn"
                >
                    Salvar Alterações
                </Button>
            </DialogActions>
        </Dialog>
    );
}

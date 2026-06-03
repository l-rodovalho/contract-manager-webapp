import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Divider, TextField,
    IconButton, CircularProgress,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { Customer } from '../customers.types';
import { useCreateCustomerMutation } from '../hooks/useCustomersApi';

interface CustomerCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CustomerCreateDialog({ open, onClose, onSuccess }: CustomerCreateDialogProps) {
    const [form, setForm] = useState<Partial<Customer>>({});
    const createCustomer = useCreateCustomerMutation();

    useEffect(() => {
        if (open) {
            setForm({});
        }
    }, [open]);

    const handleChange = (field: keyof Customer, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        createCustomer.mutate(
            {
                corporateName: form.corporateName!,
                tradeName: form.tradeName!,
                documentId: form.documentId!,
                contactEmail: form.contactEmail!,
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                },
            }
        );
    };

    const isValid = !!form.corporateName && !!form.tradeName && !!form.documentId && !!form.contactEmail;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Novo Cliente</Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="customer-create-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="customer-create-corporate-name"
                    label="Razão Social"
                    fullWidth
                    required
                    value={form.corporateName ?? ''}
                    onChange={(e) => handleChange('corporateName', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-create-trade-name"
                    label="Fantasia"
                    fullWidth
                    required
                    value={form.tradeName ?? ''}
                    onChange={(e) => handleChange('tradeName', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-create-document-id"
                    label="Documento"
                    fullWidth
                    required
                    value={form.documentId ?? ''}
                    onChange={(e) => handleChange('documentId', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-create-contact-email"
                    label="E-mail de Contato"
                    type="email"
                    fullWidth
                    required
                    value={form.contactEmail ?? ''}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    size="small"
                />

            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="customer-create-cancel-btn" disabled={createCustomer.isPending}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={createCustomer.isPending ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    disabled={createCustomer.isPending || !isValid}
                    id="customer-create-save-btn"
                >
                    Criar Cliente
                </Button>
            </DialogActions>
        </Dialog>
    );
}

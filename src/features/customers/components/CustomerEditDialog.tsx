import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Divider, TextField,
    IconButton, CircularProgress,
} from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import type { Customer } from '../customers.types';
import { useUpdateCustomerMutation } from '../hooks/useCustomersApi';

interface CustomerEditDialogProps {
    open: boolean;
    customer: Customer | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CustomerEditDialog({ open, customer, onClose, onSuccess }: CustomerEditDialogProps) {
    const [form, setForm] = useState<Partial<Customer>>({});
    const updateCustomer = useUpdateCustomerMutation();

    useEffect(() => {
        if (customer) {
            setForm({
                corporateName: customer.corporateName,
                tradeName: customer.tradeName,
                documentId: customer.documentId,
                contactEmail: customer.contactEmail,
            });
        }
    }, [customer]);

    if (!customer) return null;

    const handleChange = (field: keyof Customer, value: unknown) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updateCustomer.mutate(
            {
                id: customer.id,
                body: {
                    corporateName: form.corporateName,
                    tradeName: form.tradeName,
                    documentId: form.documentId,
                    contactEmail: form.contactEmail,
                    version: customer.version,
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
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Editar Cliente</Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{customer.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="customer-edit-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                    id="customer-edit-corporate-name"
                    label="Razão Social"
                    fullWidth
                    value={form.corporateName ?? ''}
                    onChange={(e) => handleChange('corporateName', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-edit-trade-name"
                    label="Fantasia"
                    fullWidth
                    value={form.tradeName ?? ''}
                    onChange={(e) => handleChange('tradeName', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-edit-document-id"
                    label="Documento"
                    fullWidth
                    value={form.documentId ?? ''}
                    onChange={(e) => handleChange('documentId', e.target.value)}
                    size="small"
                />

                <TextField
                    id="customer-edit-contact-email"
                    label="E-mail de Contato"
                    type="email"
                    fullWidth
                    value={form.contactEmail ?? ''}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    size="small"
                />

            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="customer-edit-cancel-btn" disabled={updateCustomer.isPending}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={updateCustomer.isPending ? <CircularProgress size={16} color="inherit" /> : <Save />}
                    disabled={updateCustomer.isPending}
                    id="customer-edit-save-btn"
                >
                    Salvar Alterações
                </Button>
            </DialogActions>
        </Dialog>
    );
}

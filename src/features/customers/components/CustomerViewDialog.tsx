import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider, Grid, IconButton,
} from '@mui/material';
import { Close, Edit, Person, Business, Email } from '@mui/icons-material';
import type { Customer } from '../../customers/customers.types';
import { formatDate } from '../../../lib/dateUtils';

interface CustomerViewDialogProps {
    open: boolean;
    customer: Customer | null;
    onClose: () => void;
    onEdit: () => void;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.25 }}>
            <Box sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0 }}>{icon}</Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

export function CustomerViewDialog({ open, customer, onClose, onEdit }: CustomerViewDialogProps) {
    if (!customer) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Detalhes do Cliente
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{customer.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="customer-view-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 2, pb: 1 }}>
                <Grid container spacing={0} columns={2}>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Business sx={{ fontSize: 18 }} />}
                            label="Razão Social"
                            value={customer.corporateName}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Person sx={{ fontSize: 18 }} />}
                            label="Fantasia"
                            value={customer.tradeName}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Business sx={{ fontSize: 18 }} />}
                            label="Documento"
                            value={customer.documentId}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Email sx={{ fontSize: 18 }} />}
                            label="E-mail de Contato"
                            value={customer.contactEmail}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 1, mb: 1.5 }} />

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Criado em</Typography>
                        <Typography variant="body2">{formatDate(customer.createdAt)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Última atualização</Typography>
                        <Typography variant="body2">{formatDate(customer.updatedAt)}</Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="customer-view-cancel-btn">
                    Fechar
                </Button>
                <Button
                    onClick={onEdit}
                    variant="contained"
                    startIcon={<Edit />}
                    id="customer-view-edit-btn"
                >
                    Editar Cliente
                </Button>
            </DialogActions>
        </Dialog>
    );
}

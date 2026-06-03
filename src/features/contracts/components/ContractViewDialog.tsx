import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider, Grid, IconButton,
} from '@mui/material';
import { Close, Edit, CalendarToday, AttachMoney, Person, Business } from '@mui/icons-material';
import type { Contract } from '../contracts.types';
import type { Customer } from '../../customers/customers.types';
import type { User } from '../../users/users.types';
import { ContractStatusChip } from './ContractStatusChip';
import { formatDate } from '../../../lib/dateUtils';

interface ContractViewDialogProps {
    open: boolean;
    contract: Contract | null;
    customer: Customer;
    user: User;
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

export function ContractViewDialog({ open, contract, customer, user, onClose, onEdit }: ContractViewDialogProps) {
    if (!contract) return null;

    const customerName = customer?.tradeName || customer?.corporateName || `Cliente ${contract.customerId}`;
    const managerName = user?.name || `Usuário ${contract.managerId}`;

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Detalhes do Contrato
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{contract.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="contract-view-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {contract.title}
                    </Typography>
                    <ContractStatusChip status={contract.status} />
                </Box>

                <Grid container spacing={0} columns={2}>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Business sx={{ fontSize: 18 }} />}
                            label="Cliente"
                            value={customerName}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Person sx={{ fontSize: 18 }} />}
                            label="Responsável"
                            value={managerName}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<CalendarToday sx={{ fontSize: 18 }} />}
                            label="Início"
                            value={formatDate(contract.startDate)}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<CalendarToday sx={{ fontSize: 18 }} />}
                            label="Vencimento"
                            value={formatDate(contract.endDate)}
                        />
                    </Grid>
                    <Grid size={2}>
                        <InfoRow
                            icon={<AttachMoney sx={{ fontSize: 18 }} />}
                            label="Valor"
                            value={
                                <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1rem' }}>
                                    {formatCurrency(contract.value)}
                                </Typography>
                            }
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 1, mb: 1.5 }} />

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Criado em</Typography>
                        <Typography variant="body2">{formatDate(contract.createdAt)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Última atualização</Typography>
                        <Typography variant="body2">{formatDate(contract.updatedAt)}</Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="contract-view-cancel-btn">
                    Fechar
                </Button>
                <Button
                    onClick={onEdit}
                    variant="contained"
                    startIcon={<Edit />}
                    id="contract-view-edit-btn"
                >
                    Editar Contrato
                </Button>
            </DialogActions>
        </Dialog>
    );
}

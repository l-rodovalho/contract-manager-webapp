import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, Typography, Divider, Grid, IconButton,
} from '@mui/material';
import { Close, Edit, Email, Person, AdminPanelSettings, ManageAccounts, Visibility } from '@mui/icons-material';
import type { User, UserRole } from '../users.types';
import { formatDate } from '../../../lib/dateUtils';

interface UserViewDialogProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onEdit?: () => void;
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

const formatRole = (role: UserRole) => {
    switch (role) {
        case 'ADMIN': return 'Administrador';
        case 'MANAGER': return 'Gestor';
        case 'VIEWER': return 'Visualizador';
        default: return role;
    }
};

const RoleIcon = ({ role }: { role: UserRole }) => {
    switch (role) {
        case 'ADMIN': return <AdminPanelSettings sx={{ fontSize: 18, color: 'error.main' }} />;
        case 'MANAGER': return <ManageAccounts sx={{ fontSize: 18, color: 'primary.main' }} />;
        case 'VIEWER': return <Visibility sx={{ fontSize: 18, color: 'text.secondary' }} />;
        default: return <Person sx={{ fontSize: 18 }} />;
    }
};

export function UserViewDialog({ open, user, onClose, onEdit }: UserViewDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
            <DialogTitle sx={{ pr: 6, pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Detalhes do Usuário
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    ID #{user.id}
                </Typography>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12, color: 'text.secondary' }}
                    id="user-view-close-btn"
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 2, pb: 1 }}>
                <Grid container spacing={0} columns={2}>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Person sx={{ fontSize: 18 }} />}
                            label="Nome"
                            value={user.name}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Email sx={{ fontSize: 18 }} />}
                            label="E-mail"
                            value={user.email}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<RoleIcon role={user.role} />}
                            label="Nível de Acesso"
                            value={formatRole(user.role)}
                        />
                    </Grid>
                    <Grid size={1}>
                        <InfoRow
                            icon={<Visibility sx={{ fontSize: 18 }} />}
                            label="Status"
                            value={user.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 1, mb: 1.5 }} />

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Criado em</Typography>
                        <Typography variant="body2">{formatDate(user.createdAt)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Última atualização</Typography>
                        <Typography variant="body2">{formatDate(user.updatedAt)}</Typography>
                    </Box>
                    {user.lastLogin && (
                        <Box>
                            <Typography variant="caption" color="text.secondary">Último Acesso</Typography>
                            <Typography variant="body2">{formatDate(user.lastLogin)}</Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onClose} color="inherit" id="user-view-cancel-btn">
                    Fechar
                </Button>
                {onEdit && (
                    <Button
                        onClick={onEdit}
                        variant="contained"
                        startIcon={<Edit />}
                        id="user-view-edit-btn"
                    >
                        Editar Usuário
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

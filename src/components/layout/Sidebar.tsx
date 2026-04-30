import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Dashboard, Description, Group, ManageAccounts, Settings } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 256;

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Contratos', icon: <Description />, path: '/contracts' },
    { text: 'Clientes', icon: <Group />, path: '/customers' },
    { text: 'Usuários', icon: <ManageAccounts />, path: '/users' },
];

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' },
            }}
        >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    C
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                        ContractOS
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Enterprise Legal
                    </Typography>
                </Box>
            </Box>

            <List sx={{ px: 2, pt: 3, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    ...(isActive && { bgcolor: '#f1f5f9', borderRight: '2px solid #0f172a' }),
                                    '&:hover': { bgcolor: '#f8fafc' }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#0f172a' : '#64748b' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: isActive ? 600 : 500,
                                                color: isActive ? '#0f172a' : '#64748b'
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider />
            <List sx={{ px: 2, pb: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ borderRadius: 2, color: '#64748b', '&:hover': { bgcolor: '#f8fafc', color: '#0f172a' } }}>
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><Settings /></ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography variant="body1" sx={{ fontWeight: 500, color: 'inherit' }}>
                                    Configurações
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
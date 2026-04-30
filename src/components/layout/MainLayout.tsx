import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: '#f8f9ff' }}>
            <Sidebar />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 3, lg: 4 } }}>
                    <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import { Menu } from '@mui/icons-material';

export function Header() {
    return (
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important' }}>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit">
                        <Menu />
                    </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdui0guq5nmnajCS5v12k_F7199xFftEBojapAZUewWM5i_7n91M1W1WcuDbZRl6yPPs9jK66ytHoXVKYEfwEoqp4G0Z1QmOeGEXFF21QIVp7PhqSmPzvwl6fFjDHtzy1yUOB3feAjr4fKTVBHhBrdtAwBWgxiEJWzd9sDwzrZlf-t81doOjK4j6niQ3vRfNB0lDTzut29zxUMEg4j601elAAkDP-JJ1Ta3cIXLimmuuPXapJlIpLFFfU9meettQl5dxsisJzirZD_" sx={{ width: 32, height: 32, ml: 1, border: '1px solid #cbd5e1' }} />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
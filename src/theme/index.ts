import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#515f74',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ba1a1a',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f9ff',
            paper: '#ffffff',
        },
        text: {
            primary: '#0b1c30',
            secondary: '#45464d',
        },
        divider: '#e2e8f0',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: '32px',
            letterSpacing: '-0.015em',
        },
        h2: {
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.01em',
        },
        body1: {
            fontSize: '14px',
            lineHeight: '20px',
        },
        body2: {
            fontSize: '13px',
            lineHeight: '18px',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0px 1px 2px 0px rgba(15, 23, 42, 0.05)',
                },
            },
        },
    },
});
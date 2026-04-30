import { useState } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton, InputBase, Toolbar, Menu, MenuItem
} from '@mui/material';
import { Add, MoreVert, Search, FilterList } from '@mui/icons-material';

import { useContractsQuery } from './hooks/useContractsQuery';
import { ContractStatusChip } from './components/ContractStatusChip';

export function ContractsList() {
    const { data: contracts, isLoading, isError } = useContractsQuery();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h1" color="text.primary">Contratos</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        Gerencie o ciclo de vida e a vigência dos acordos.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />}>
                    Novo Contrato
                </Button>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: 2, px: 2, py: 0.5, flex: 1, maxWidth: 400 }}>
                        <Search sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
                        <InputBase placeholder="Buscar por cliente ou ID..." sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button startIcon={<FilterList />} color="inherit" sx={{ color: 'text.secondary' }}>Filtros</Button>
                </Toolbar>

                <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
                    <Table stickyHeader size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Cliente</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Título</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Valor (ARR)</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Vencimento</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ bgcolor: '#fff' }}>
                            {isLoading && <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4 }}>Carregando contratos...</TableCell></TableRow>}
                            {isError && <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4, color: 'error.main' }}>Erro ao carregar dados.</TableCell></TableRow>}

                            {contracts?.map((contract) => (
                                <TableRow hover key={contract.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{contract.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{contract.customerName}</TableCell>
                                    <TableCell>{contract.title}</TableCell>
                                    <TableCell>{formatCurrency(contract.value)}</TableCell>
                                    <TableCell><ContractStatusChip status={contract.status} /></TableCell>
                                    <TableCell>{new Intl.DateTimeFormat('pt-BR').format(new Date(contract.endDate))}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={handleOpenMenu}><MoreVert fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} elevation={2}>
                <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '0.875rem' }}>Visualizar Detalhes</MenuItem>
                <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '0.875rem' }}>Editar Contrato</MenuItem>
                <MenuItem onClick={handleCloseMenu} sx={{ fontSize: '0.875rem', color: 'error.main' }}>Arquivar</MenuItem>
            </Menu>
        </Box>
    );
}
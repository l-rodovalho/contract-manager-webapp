import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, CircularProgress
} from '@mui/material';

export interface TableColumn<T> {
    id: string;
    label: string;
    propName?: keyof T;
    render?: (row: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
    columns: TableColumn<T>[];
    data?: T[];
    isLoading?: boolean;
    isError?: boolean;
    emptyMessage?: string;
}

export function DataTable<T>({
    columns,
    data = [],
    isLoading,
    isError,
    emptyMessage = 'Nenhum registro encontrado.'
}: DataTableProps<T>) {

    if (isError) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', color: 'error.main', bgcolor: '#fff', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography>Erro ao carregar os dados.</Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
            <Table stickyHeader size="medium">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={col.id}
                                align={col.align || 'left'}
                                sx={{ fontWeight: 600, color: 'text.secondary', bgcolor: '#f8fafc' }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody sx={{ bgcolor: '#fff' }}>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                                <CircularProgress size={24} sx={{ mb: 2 }} />
                                <Typography color="text.secondary">Carregando...</Typography>
                            </TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                                <Typography color="text.secondary">{emptyMessage}</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow hover key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {columns.map((col) => (
                                    <TableCell key={col.id} align={col.align || 'left'}>
                                        {col.render ? col.render(row) : col.propName ? String(row[col.propName]) : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
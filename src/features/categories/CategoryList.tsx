import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCategories } from './CategorySlice'
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryList = () => {
    const categories = useAppSelector(selectCategories)

    const rows: GridRowsProp = !categories ? [{
        id: 'Nenhum registro',

    }] : categories?.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
    }))

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'isActive', headerName: 'Active', flex: 1, type: 'boolean', renderCell: renderIsActiveCell },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'actions', headerName: 'Actions', flex: 1, renderCell: renderActionsCell },
    ];

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        if (rowData.value === undefined) return ''

        return (
            <Typography color={rowData.value ? 'primary' : 'secondary'}>
                {rowData.value ? 'Active' : 'Inactive'}
            </Typography>
        )
    }

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton onClick={() => console.log('deleteRow')} color='secondary' aria-label="delete" size="medium">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        )
    }

    return (
        <Box>
            <Box display='flex' justifyContent='flex-end'>
                <Button
                    variant='contained'
                    color='secondary'
                    component={Link}
                    to='/category/create'
                    style={{ marginBottom: '1rem' }}
                >
                    New Category
                </Button>
            </Box>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={3}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    )
}

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
	GridToolbar,
} from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, deleteCategory, selectCategories } from './CategorySlice';
import { useSnackbar } from 'notistack';

export const CategoryList = () => {
	const categories = useAppSelector(selectCategories);
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	function handleDeleteCategory(id: string) {
		dispatch(deleteCategory(id));
		enqueueSnackbar('Success deleting category!', { variant: 'success' });
	}

	const rows: GridRowsProp = !categories
		? [
				{
					id: 'Nenhum registro',
				},
		  ]
		: categories?.map((category: Category) => ({
				id: category.id,
				name: category.name,
				description: category.description,
				isActive: category.is_active,
				createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
		  }));

	const columns: GridColDef[] = [
		// { field: 'id', headerName: 'ID', flex: 1 },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			renderCell: renderNameFieldCell,
		},
		{ field: 'description', headerName: 'Description', flex: 1 },
		{
			field: 'isActive',
			headerName: 'Active',
			flex: 1,
			type: 'boolean',
			renderCell: renderIsActiveCell,
		},
		{ field: 'createdAt', headerName: 'Created At', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: renderActionsCell,
		},
	];

	function renderNameFieldCell(rowData: GridRenderCellParams) {
		return (
			<Typography
				color="primary"
				component={Link}
				to={`/category/edit/${rowData.id}`}
				sx={{ textDecoration: 'none' }}
			>
				{rowData.value}
			</Typography>
		);
	}

	function renderIsActiveCell(rowData: GridRenderCellParams) {
		if (rowData.value === undefined) return '';

		return (
			<Typography color={rowData.value ? 'primary' : 'secondary'}>
				{rowData.value ? 'Active' : 'Inactive'}
			</Typography>
		);
	}

	function renderActionsCell(rowData: GridRenderCellParams) {
		return (
			<IconButton
				onClick={() => handleDeleteCategory(String(rowData.id))}
				color="secondary"
				aria-label="delete"
				size="medium"
			>
				<DeleteIcon fontSize="inherit" />
			</IconButton>
		);
	}

	return (
		<Box>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/category/create"
					style={{ marginBottom: '1rem' }}
				>
					New Category
				</Button>
			</Box>

			<div style={{ height: 410.5, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					components={{ Toolbar: GridToolbar }}
					componentsProps={{
						toolbar: {
							showQuickFilter: true,
							quickFilterProps: { debounceMs: 500 },
						},
					}}
					disableColumnSelector
					disableDensitySelector
					disableColumnFilter
					checkboxSelection
					disableSelectionOnClick
				/>
			</div>
		</Box>
	);
};

import { Box, Button, IconButton, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Category } from '../../@types/Category';
import { useAppSelector } from '../../app/hooks';
import {
	selectCategories,
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from './CategorySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	console.log(categories);
	console.log(isLoading);
	console.log(error);

	const rows: GridRowsProp = categories
		? categories?.data.map((category: Category) => ({
				id: category.id,
				name: category.name,
				description: category.description,
				isActive: category.is_active,
				createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
		  }))
		: [];

	const columns: GridColDef[] = [
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
			field: 'id',
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
				onClick={() => handleDeleteCategory(rowData.value)}
				color="secondary"
				aria-label="delete"
				size="medium"
			>
				<DeleteIcon fontSize="inherit" />
			</IconButton>
		);
	}

	async function handleDeleteCategory(id: string) {
		await deleteCategory({ id });
	}

	useEffect(() => {
		if (deleteCategoryStatus.isSuccess) {
			enqueueSnackbar('Category deleted', { variant: 'success' });
		}
		if (deleteCategoryStatus.error) {
			enqueueSnackbar('Category not deleted', { variant: 'error' });
		}
	}, [deleteCategoryStatus, enqueueSnackbar]);

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

			{categories && (
				<div style={{ height: 410.5, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} />
				</div>
			)}
		</Box>
	);
};

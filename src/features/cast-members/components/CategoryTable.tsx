import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridFilterModel,
	GridRenderCellParams,
	GridRowsProp,
	GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Results } from '../../../@types/Category';
import { useDeleteCategoryMutation } from '../CategorySlice';

type Props = {
	data: Results | undefined;
	perPage: number;
	isFetching: boolean;
	rowsPerPage?: number[];

	handleOnPageChange: (page: number) => void;
	handleFilterChange: (filterModel: GridFilterModel) => void;
	handleOnPageSizeChange: (perPage: number) => void;
	handleDelete: (id: string) => void;
};

export const CategoryTable = ({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Props) => {
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

	const componentsProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: { debounceMs: 500 },
		},
	};

	const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
	const rowCount = data?.meta.total ?? 0;

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
			<Typography
				variant="subtitle1"
				color={rowData.value ? 'success' : 'secondary'}
			>
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

	function mapDataToGridRows(data: Results) {
		const { data: categories } = data;

		return categories.map((category) => ({
			id: category.id,
			name: category.name,
			description: category.description,
			isActive: category.is_active,
			createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
		}));
	}

	return (
		<Box sx={{ display: 'flex', height: 410.5 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				loading={isFetching}
				pageSize={perPage}
				rowsPerPageOptions={rowsPerPage}
				rowCount={rowCount}
				filterMode="server"
				paginationMode="server"
				components={{ Toolbar: GridToolbar }}
				componentsProps={componentsProps}
				disableColumnSelector
				disableDensitySelector
				disableColumnFilter
				disableSelectionOnClick
				checkboxSelection
				onPageChange={handleOnPageChange}
				onFilterModelChange={handleFilterChange}
				onPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
};

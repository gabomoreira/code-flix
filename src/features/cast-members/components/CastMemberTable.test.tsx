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
import { Results } from '../../../@types/CastMember';
import { useDeleteCastMemberMutation } from '../CastMemberSlice';

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

export const CastMemberTable = ({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Props) => {
	const [deleteCastMember, deleteCastMemberStatus] =
		useDeleteCastMemberMutation();

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
		{ field: 'type', headerName: 'Type', flex: 1, renderCell: renderTypeCell },
		{
			field: 'createdAt',
			headerName: 'Created At',
			flex: 1,
			renderCell: renderNameFieldCell,
		},
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
				to={`/cast-member/edit/${rowData.id}`}
				sx={{ textDecoration: 'none' }}
			>
				{rowData.value}
			</Typography>
		);
	}

	function renderTypeCell(rowData: GridRenderCellParams) {
		if (rowData.value === undefined) return '';

		return (
			<Typography variant="subtitle1">
				{rowData.value === '1' ? 'Diretor' : 'Actor'}
			</Typography>
		);
	}

	function renderActionsCell(rowData: GridRenderCellParams) {
		return (
			<IconButton
				onClick={() => handleDeleteCastMember(rowData.value)}
				color="secondary"
				aria-label="delete"
				size="medium"
			>
				<DeleteIcon fontSize="inherit" />
			</IconButton>
		);
	}

	async function handleDeleteCastMember(id: string) {
		await deleteCastMember({ id });
	}

	function mapDataToGridRows(data: Results) {
		const { data: categories } = data;

		return categories.map((CastMember) => ({
			id: CastMember.id,
			name: CastMember.name,
			type: CastMember.type,
			createdAt: new Date(CastMember.created_at).toLocaleDateString('pt-BR'),
		}));
	}

	return (
		<Box sx={{ display: 'flex', height: 410.5, backgroundColor: 'white' }}>
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

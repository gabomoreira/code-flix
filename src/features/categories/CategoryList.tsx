import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
	GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../@types/Category';
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from './CategorySlice';
import { CategoryTable } from './components/CategoryTable';

export const CategoryList = () => {
	const { data, isFetching, error } = useGetCategoriesQuery();
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

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

			{data && (
				<CategoryTable
					data={data}
					isFetching={isFetching}
					perPage={5}
					rowsPerPage={[5, 10]}
				/>
			)}
		</Box>
	);
};

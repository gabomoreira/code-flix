import { Box, Button } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from './CategorySlice';
import { CategoryTable } from './components/CategoryTable';

export const CategoryList = () => {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(5);
	const [search, setSearch] = useState('');
	const [rowsPerPage] = useState([5, 10, 20, 30]);

	const options = { page, perPage, search };

	const { data, isFetching, error } = useGetCategoriesQuery(options);
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

	async function handleDeleteCategory(id: string) {
		deleteCategory({ id });
	}
	async function handleOnPageChange(page: number) {
		setPage(page + 1);
	}
	async function handleOnPageSizeChange(perPage: number) {
		setPerPage(perPage);
	}
	async function handleFilterChange(filterModel: GridFilterModel) {
		if (filterModel.quickFilterValues?.length) {
			const search = filterModel.quickFilterValues.join(' ');
			setSearch(search);
			return;
		}

		return setSearch('');
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

			<CategoryTable
				data={data}
				isFetching={isFetching}
				perPage={perPage}
				rowsPerPage={rowsPerPage}
				handleDelete={handleDeleteCategory}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
};

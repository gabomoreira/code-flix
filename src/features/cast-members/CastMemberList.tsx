import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignInMutation } from '../auth/authSlice';
import {
	useDeleteCastMemberMutation,
	useGetCastMembersQuery,
} from './CastMemberSlice';
import { CastMemberTable } from './components/CastMemberTable';

export const CastMemberList = () => {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(5);
	const [search, setSearch] = useState('');
	const [rowsPerPage] = useState([5, 10, 20, 30]);

	const options = { page, perPage, search };

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { data, isFetching, error } = useGetCastMembersQuery(options);
	const [deleteCastMember, deleteCastMemberStatus] =
		useDeleteCastMemberMutation();

	async function handleDeleteCastMember(id: string) {
		deleteCastMember({ id });
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

	useEffect(() => {
		if (deleteCastMemberStatus.isSuccess) {
			enqueueSnackbar('CastMember deleted', { variant: 'success' });
		}
		if (deleteCastMemberStatus.error) {
			enqueueSnackbar('CastMember not deleted', { variant: 'error' });
		}
		if (error) {
			console.log(error);
			enqueueSnackbar('Error fetching cast members', { variant: 'error' });
		}
	}, [deleteCastMemberStatus, enqueueSnackbar, error]);

	if (error) {
		return <Typography>Error fetching cast members</Typography>;
	}

	return (
		<Box>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/cast-member/create"
					style={{ marginBottom: '1rem' }}
				>
					New Cast Member
				</Button>
			</Box>

			<CastMemberTable
				data={data}
				isFetching={isFetching}
				perPage={perPage}
				rowsPerPage={rowsPerPage}
				handleDelete={handleDeleteCastMember}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
};

import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
} from '@mui/material';
import { useSignInMutation } from '../api/apiSlice';
import React from 'react';
import { useGetCategoriesQuery } from '../categories/CategorySlice';

export const AuthSignin = () => {
	const [page, setPage] = React.useState(1);
	const [perPage, setPerPage] = React.useState(5);
	const [search, setSearch] = React.useState('');
	const [rowsPerPage] = React.useState([5, 10, 20, 30]);

	const options = { page, perPage, search };

	const [signIn, signInStatus] = useSignInMutation();
	const { data, isFetching, error } = useGetCategoriesQuery(options);

	const [getCategories, setGeCategories] = React.useState(0);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signIn({ email: 'gabosm4@gmail.com', password: '123456' });
	};

	React.useEffect(() => {
		if (signInStatus.isLoading) {
			setGeCategories(getCategories + 1);
		}
	}, [signInStatus]);

	return (
		<Box p={2}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								// required
								name="name"
								label="Name"
								// disabled={isDisabled}
								// onChange={handleOnChange}
								// value={'category?.name'}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								// required
								name="description"
								label="Description"
								// disabled={isDisabled}
								// onChange={handleOnChange}
								// value={category?.description}
							/>
						</FormControl>
					</Grid>

					<Button type="submit">Login</Button>
				</Grid>
			</form>
		</Box>
	);
};

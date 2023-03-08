import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	Category,
	selectCategoryPerId,
	updateCategory,
	useGetCategoryQuery,
	useUpdateCategoryMutation,
} from './CategorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack';

export const CategoryEdit = () => {
	const id = useParams().id || '';
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { data: category, isFetching, error } = useGetCategoryQuery({ id });
	const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();

	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [categoryState, setCategoryState] = useState<Category>({
		name: '',
		description: '',
		is_active: false,
		created_at: '',
		deleted_at: '',
		updated_at: '',
		id: '',
	});

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await updateCategory(categoryState);
	}

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleOnChangeToggle(e: React.ChangeEvent<HTMLInputElement>) {
		console.log;
		setCategoryState((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	}

	useEffect(() => {
		setIsDisabled(true);

		if (category) {
			setCategoryState(category);
		}

		setIsDisabled(false);
	}, [category]);

	useEffect(() => {
		if (updateCategoryStatus.isSuccess) {
			enqueueSnackbar('Success updated category!', { variant: 'success' });
		}
		if (updateCategoryStatus.isError) {
			enqueueSnackbar('Error updated category!', { variant: 'error' });
		}
	}, [updateCategoryStatus]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Category</Typography>
					</Box>
				</Box>

				<CategoryForm
					category={categoryState}
					handleOnChange={handleOnChange}
					isLoading={isDisabled}
					handleSubmit={handleSubmit}
					isDisabled={isDisabled}
					handleOnChangeToggle={handleOnChangeToggle}
				/>
			</Paper>
		</Box>
	);
};

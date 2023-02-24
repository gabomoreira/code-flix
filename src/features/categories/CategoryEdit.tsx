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
import React, { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, selectCategoryPerId, updateCategory } from './CategorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack';

export const CategoryEdit = () => {
	const id = useParams().id || '';
	const dispatch = useAppDispatch();
	const category = useAppSelector((state) => selectCategoryPerId(state, id));
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [categoryState, setCategoryState] = useState<Category>(category);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// setIsLoading(true)
		dispatch(updateCategory(categoryState));
		enqueueSnackbar('Success updating category!', { variant: 'success' });
	}

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleOnChangeToggle(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoryState((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	}

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
					isLoading={isLoading}
					handleSubmit={handleSubmit}
					isDisabled={isDisabled}
					handleOnChangeToggle={handleOnChangeToggle}
				/>
			</Paper>
		</Box>
	);
};

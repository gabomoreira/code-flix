import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	Category,
	createCategory,
	useCreateCategoryMutation,
} from './CategorySlice';

import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack';

export const CategoryCreate = () => {
	const [createCategory, createCategoryStatus] = useCreateCategoryMutation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [category, setCategory] = useState<Category>({
		name: '',
		description: '',
		is_active: true,
		created_at: '',
		deleted_at: '',
		updated_at: '',
		id: '',
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleOnChangeToggle(e: React.ChangeEvent<HTMLInputElement>) {
		setCategory((prev) => ({
			...prev,
			[e.target.name]: e.target.checked,
		}));
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setIsDisabled(true);
		await createCategory(category);
	}

	useEffect(() => {
		if (createCategoryStatus.isSuccess) {
			enqueueSnackbar('Success creating category!', { variant: 'success' });
		}
		if (createCategoryStatus.error) {
			console.log(createCategoryStatus.error);
			enqueueSnackbar('Error creating category!', { variant: 'error' });
		}

		setIsDisabled(false);
	}, [createCategoryStatus]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create Category</Typography>
					</Box>
				</Box>

				<CategoryForm
					category={category}
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

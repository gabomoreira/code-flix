import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Category } from './CategorySlice';

import { CategoryForm } from './components/CategoryForm';

export const CategoryCreate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [category, setCategory] = useState<Category>({
		name: '',
		description: '',
		is_active: false,
		created_at: '',
		deleted_at: '',
		updated_at: '',
		id: '',
	});

	function handleOnChange(e: any) {}

	function handleOnChangeToggle() {}

	function handleSubmit() {}

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

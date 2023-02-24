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
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCategoryPerId } from './CategorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryEdit = () => {
	const id = useParams().id || '';
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const category = useAppSelector((state) => selectCategoryPerId(state, id));

	function handleOnChange(e: any) {}

	function handleOnChangeToggle() {}

	function handleSubmit() {}

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Category</Typography>
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

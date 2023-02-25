import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCategories } from './CategorySlice';

export const CategoryList = () => {
	const categories = useAppSelector(selectCategories);

	console.log(categories);

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

			<Typography variant="h3" component="h1">
				List Category
			</Typography>

			{categories?.map((item) => (
				<Typography key={item.id}>{item.name}</Typography>
			))}
		</Box>
	);
};

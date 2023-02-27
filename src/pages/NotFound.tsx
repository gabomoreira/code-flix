import { Box, Typography } from '@mui/material';
import React from 'react';

export const NotFound = () => {
	return (
		<Box
			flex={1}
			component="main"
			sx={{
				display: 'flex',
				backgroundColor: (theme) => theme.palette.grey[900],
				color: 'white',
			}}
		>
			<Box
				flex={1}
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Typography variant="h1">404</Typography>
				<Typography variant="h2">Page not found</Typography>
			</Box>
		</Box>
	);
};

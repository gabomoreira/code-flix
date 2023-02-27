import { Box, Container } from '@mui/material';
import React from 'react';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<Box sx={{ minHeight: '100vh' }}>
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4, color: 'white' }}>
				{children}
			</Container>
		</Box>
	);
};

import { Box, ThemeProvider } from '@mui/material';

import { appTheme } from './config/theme';

import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Routes } from 'react-router-dom';

import { AppRoutes } from './routes/app.routes';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box
					component="main"
					sx={{
						height: '100vh',
						backgroundColor: (theme) => theme.palette.grey[900],
					}}
				>
					<AppRoutes />
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;

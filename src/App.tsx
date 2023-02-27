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
				maxSnack={5}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<AppRoutes />
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;

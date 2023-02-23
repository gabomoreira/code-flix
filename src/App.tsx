
import { Box, ThemeProvider } from '@mui/material';

import { appTheme } from './config/theme';

import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Routes } from 'react-router-dom';

import { AppRoutes } from './routes/app.routes';


function App() {
  return (
    <ThemeProvider theme={appTheme}>

      <Box component='main' sx={{ height: '100vh', backgroundColor: (theme) => theme.palette.grey[900] }}>
        <Header />

        <Layout>
          <AppRoutes />
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;

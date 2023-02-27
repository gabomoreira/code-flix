import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AuthRegister } from '../features/auth/AuthRegister';
import { AuthSignIn } from '../features/auth/AuthSignin';
import { selectCurrentUser } from '../features/auth/authSlice';

import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import AdminRoutes from './AdminRoutes';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
	const [welcome, setWelcome] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();
	const user = useAppSelector(selectCurrentUser);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (user) {
			if (location.pathname === '/auth') {
				navigate('/');
			}

			if (location.pathname === '/' && welcome < 1) {
				enqueueSnackbar('Welcome', { variant: 'success' });
			}

			setWelcome(1);
		}
	}, [user, welcome]);

	return (
		<>
			{!user && (
				<Routes>
					<Route path="/auth" element={<AuthSignIn />} />
					<Route path="/register" element={<AuthRegister />} />

					<Route path="*" element={<AuthSignIn />} />
				</Routes>
			)}

			{user?.role === 'ADMIN' && <AdminRoutes />}
		</>
	);
};

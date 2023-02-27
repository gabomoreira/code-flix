import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AuthRegister } from '../features/auth/AuthRegister';
import { AuthSignIn } from '../features/auth/AuthSignin';
import { selectCurrentUser } from '../features/auth/authSlice';

import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import AdminRoutes from './AdminRoutes';

export const AppRoutes = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectCurrentUser);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (user) {
			navigate('/');
			enqueueSnackbar('Welcome', { variant: 'success' });
		}
	}, [user]);

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

import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AuthSignIn } from '../features/auth/AuthSignIn';
import { AuthRegister } from '../features/auth/AuthRegister';
import { selectCurrentUser } from '../features/auth/authSlice';

import { CategoryCreate } from '../features/categories/CategoryCreate';
import { CategoryEdit } from '../features/categories/CategoryEdit';
import { CategoryList } from '../features/categories/CategoryList';
import { NotFound } from '../pages/NotFound';

import { Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

export const AppRoutes = () => {
	const user = useAppSelector(selectCurrentUser);

	return (
		<Routes>
			<Route
				path="/"
				element={
					user ? <CategoryList /> : <Navigate to="/auth" replace={true} />
				}
			>
				{user?.role === 'ADMIN' && (
					<>
						<Route path="/" element={<CategoryList />} />
						<Route path="/categories" element={<CategoryList />} />
						<Route path="/category/create" element={<CategoryCreate />} />
						<Route path="/category/edit/:id" element={<CategoryEdit />} />
					</>
				)}
			</Route>
			<Route
				path="/auth"
				element={
					<Layout>
						<AuthSignIn />
					</Layout>
				}
			/>
			<Route path="/register" element={<AuthRegister />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

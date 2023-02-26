import { Route, Routes } from 'react-router-dom';
import { AuthSignin } from '../features/auth/AuthSignin';

import { CategoryCreate } from '../features/categories/CategoryCreate';
import { CategoryEdit } from '../features/categories/CategoryEdit';
import { CategoryList } from '../features/categories/CategoryList';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<CategoryList />} />
			<Route path="/categories" element={<CategoryList />} />
			<Route path="/category/create" element={<CategoryCreate />} />
			<Route path="/category/edit/:id" element={<CategoryEdit />} />

			<Route path="/auth" element={<AuthSignin />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

import { Routes, Route } from 'react-router-dom';
import { CastMemberList } from '../features/cast-members/CastMemberList';
import { CategoryCreate } from '../features/categories/CategoryCreate';
import { CategoryEdit } from '../features/categories/CategoryEdit';
import { CategoryList } from '../features/categories/CategoryList';
import { NotFound } from '../pages/NotFound';
import { DesktopLayout } from './DesktopLayout';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<DesktopLayout />}>
				<Route path="/" element={<CategoryList />} />
				<Route path="/categories" element={<CategoryList />} />
				<Route path="/category/create" element={<CategoryCreate />} />
				<Route path="/category/edit/:id" element={<CategoryEdit />} />

				<Route path="/cast-members" element={<CastMemberList />} />
				<Route path="/category/create" element={<CategoryCreate />} />
				<Route path="/category/edit/:id" element={<CategoryEdit />} />

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default Router;

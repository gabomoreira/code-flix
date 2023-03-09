import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoryForm } from './CategoryForm';

const Props = {
	category: {
		id: '1',
		name: 'Categoria teste',
		is_active: true,
		created_at: '2023-02-28 19:28:19.418+00',
		updated_at: '2023-02-28 19:28:19.418+00',
		deleted_at: null,
		description: 'A categoria de teste é para testar',
	},
	isDisabled: false,
	isLoading: false,
	handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {},
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
	handleOnChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

describe('CategoryForm', () => {
	it('should render correctly', () => {
		const { asFragment } = render(<CategoryForm {...Props} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with loading', () => {
		const { asFragment } = render(
			<CategoryForm {...Props} isLoading isDisabled />,
			{
				wrapper: BrowserRouter,
			}
		);

		expect(asFragment()).toMatchSnapshot();
	});
});

import { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoryTable } from './CategoryTable';

const Props = {
	data: undefined,
	perPage: 1,
	isFetching: false,
	rowsPerPage: [10, 20, 30],

	handleOnPageChange: (page: number) => {},
	handleFilterChange: (filterModel: GridFilterModel) => {},
	handleOnPageSizeChange: (perPage: number) => {},
	handleDelete: (id: string) => {},
};

const data = {
	data: [
		{
			id: '1',
			name: 'Categoria Teste',
			description: 'A categoria é teste',
			is_active: true,
			deleted_at: null,
			created_at: 'string',
			updated_at: 'string',
		},
	],
	meta: {
		total: 1,
		per_page: 1,
		current_page: 1,
		last_page: 1,
		first_page: 1,
		first_page_url: '1',
		last_page_url: '1',
		next_page_url: '',
		previous_page_url: '',
	},
};

describe('CategoryTable', () => {
	it('should render category table correctly', () => {
		const { asFragment } = render(<CategoryTable {...Props} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render category table with loading', () => {
		const { asFragment } = render(<CategoryTable {...Props} isFetching />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render category table with data', () => {
		const { asFragment } = render(<CategoryTable {...Props} data={data} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render category table with is_active as false', () => {
		const { asFragment } = render(
			<CategoryTable
				{...Props}
				data={{
					...data,
					data: [...data.data, { ...data.data[0], is_active: false }],
				}}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);

		expect(asFragment()).toMatchSnapshot();
	});
});

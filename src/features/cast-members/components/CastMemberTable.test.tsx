// import { GridFilterModel } from '@mui/x-data-grid';
// import { render } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { CastMemberTable } from './CastMemberTable';

// const Props = {
// 	data: undefined,
// 	perPage: 10,
// 	isFetching: false,
// 	rowsPerPage: [10, 20, 30],

// 	handleOnPageChange: (page: number) => {},
// 	handleFilterChange: (filterModel: GridFilterModel) => {},
// 	handleOnPageSizeChange: (perPage: number) => {},
// 	handleDelete: (id: string) => {},
// };

// const data = {
// 	data: [
// 		{
// 			id: '1',
// 			name: 'Jacinto Pinto',
// 			type: '1',
// 			deleted_at: null,
// 			created_at: '2023-02-28 19:28:19.418+00',
// 			updated_at: '2023-02-28 19:28:19.418+00',
// 		},
// 	],
// 	meta: {
// 		total: 1,
// 		per_page: 1,
// 		current_page: 1,
// 		last_page: 1,
// 		first_page: 1,
// 		first_page_url: '1',
// 		last_page_url: '1',
// 		next_page_url: '',
// 		previous_page_url: '',
// 	},
// };

// describe('CastMemberTable', () => {
// 	it('should render castMember table correcly', () => {
// 		const { asFragment } = render(<CastMemberTable {...Props} />, {
// 			wrapper: BrowserRouter,
// 		});

// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('should render castMember table with loading', () => {
// 		const { asFragment } = render(<CastMemberTable {...Props} isFetching />, {
// 			wrapper: BrowserRouter,
// 		});

// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('should render castMember table with empty data', () => {
// 		const { asFragment } = render(
// 			<CastMemberTable {...Props} data={{ data: [], meta: {} } as any} />,
// 			{
// 				wrapper: BrowserRouter,
// 			}
// 		);

// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('should render castMember table with data', () => {
// 		const { asFragment } = render(<CastMemberTable {...Props} data={data} />, {
// 			wrapper: BrowserRouter,
// 		});

// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('should render correct type', () => {
// 		const { asFragment } = render(
// 			<CastMemberTable
// 				{...Props}
// 				data={{ ...data, data: [...data.data, { ...data.data[0], type: '1' }] }}
// 			/>,
// 			{
// 				wrapper: BrowserRouter,
// 			}
// 		);

// 		expect(asFragment()).toMatchSnapshot();
// 	});

// 	it('should render not correct', () => {
// 		const { asFragment } = render(
// 			<CastMemberTable
// 				{...Props}
// 				data={{ ...data, data: [...data.data, { ...data.data[0], type: 2 }] }}
// 			/>,
// 			{
// 				wrapper: BrowserRouter,
// 			}
// 		);

// 		expect(asFragment()).toMatchSnapshot();
// 	});
// });

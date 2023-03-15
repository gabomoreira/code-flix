import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
	fireEvent,
	renderWithProviders,
	screen,
	waitFor,
} from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { CastMemberList } from './CastMemberList';
import { castMemberResponse, castMemberResponse2 } from './mocks';

export const handleers = [
	rest.get(`${baseUrl}/cast-member`, (req, res, ctx) => {
		if (req.url.searchParams.get('page') === '2') {
			return res(ctx.json(castMemberResponse2), ctx.delay(150));
		}
		return res(ctx.json(castMemberResponse), ctx.delay(150));
	}),

	rest.delete(
		`${baseUrl}/cast-member/5051d9cf-342f-4e37-965e-05b61c9609fb`,
		(_, res, ctx) => {
			console.log('deletou');
			return res(ctx.delay(150), ctx.status(204));
		}
	),
];

const server = setupServer(...handleers);

describe('CastMemberList', () => {
	afterAll(() => server.close());
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());

	it('should correctly render', () => {
		const { asFragment } = renderWithProviders(<CastMemberList />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render loading state', () => {
		renderWithProviders(<CastMemberList />);
		const loading = screen.getByRole('progressbar');
		expect(loading).toBeInTheDocument();
	});

	it('should render success state', async () => {
		renderWithProviders(<CastMemberList />);

		await waitFor(() => {
			const name = screen.getByText('Hugh Jackman');
			expect(name).toBeInTheDocument();
		});
	});

	it('should render error state', async () => {
		server.use(
			rest.get(`${baseUrl}/cast-member`, (_, res, ctx) => {
				return res(ctx.status(500));
			})
		);
		renderWithProviders(<CastMemberList />);

		await waitFor(() => {
			const error = screen.getByText('Error fetching cast members');
			expect(error).toBeInTheDocument();
		});
	});

	it('should handle on PageChange', async () => {
		renderWithProviders(<CastMemberList />);

		await waitFor(() => {
			const name = screen.getByText('Hugh Jackman');
			expect(name).toBeInTheDocument();
		});

		const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
		fireEvent.click(nextButton);

		await waitFor(() => {
			const name = screen.getByText('Patati Patata');
			expect(name).toBeInTheDocument();
		});
	});

	it('should handle filter change', async () => {
		renderWithProviders(<CastMemberList />);

		await waitFor(() => {
			const name = screen.getByText('Hugh Jackman');
			expect(name).toBeInTheDocument();
		});

		const input = screen.getByPlaceholderText('Search…');

		fireEvent.change(input, { target: { value: 'Patati Patata' } });

		await waitFor(() => {
			const loading = screen.getByRole('progressbar');
			expect(loading).toBeInTheDocument();
		});
	});

	// it('should handle delete cast member', async () => { DON'T FIND buttonDelete data-testId
	// 	renderWithProviders(<CastMemberList />);

	// 	await waitFor(() => {
	// 		const name = screen.getByText('Hugh Jackman');
	// 		expect(name).toBeInTheDocument();
	// 	});
	// 	await waitFor(() => {
	// 		const name = screen.getByText('Patati Patata');
	// 		expect(name).toBeInTheDocument();
	// 	});

	// const deleteButton = screen.getByTestId('delete-button');
	// fireEvent.click(deleteButton);

	// await waitFor(() => {
	// 	const message = screen.getByText('CastMember deleted');
	// 	expect(message).toBeInTheDocument();
	// });
	// });
});

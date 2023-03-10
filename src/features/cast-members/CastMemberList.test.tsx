import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithProviders, screen, waitFor } from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { CastMemberList } from './CastMemberList';
import { castMemberResponse } from './mocks';

export const handleers = [
	rest.get(`${baseUrl}/cast-member`, (_, res, ctx) => {
		return res(ctx.json(castMemberResponse), ctx.delay(150));
	}),
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
		// wait element render
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
});

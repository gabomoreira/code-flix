import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithProviders, screen } from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { CastMemberList } from './CastMemberList';
import { castMemberResponse } from './mocks';

export const handleers = [
	rest.get(`${baseUrl}/cast-members`, (_, res, ctx) => {
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
});

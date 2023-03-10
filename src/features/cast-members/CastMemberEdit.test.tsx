import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberEdit } from './CastMemberEdit';

const mockedStore = {};

describe('CastMemberEdit', () => {
	it('should correctly render', () => {
		const { asFragment } = renderWithProviders(<CastMemberEdit />);

		expect(asFragment()).toMatchSnapshot();
	});
});

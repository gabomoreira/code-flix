import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberCreate } from './CastMemberCreate';

describe('CastMemberCreate', () => {
	it('should correctly render', () => {
		const { asFragment } = renderWithProviders(<CastMemberCreate />);

		expect(asFragment()).toMatchSnapshot();
	});
});

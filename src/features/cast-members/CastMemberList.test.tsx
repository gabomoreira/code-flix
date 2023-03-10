import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberList } from './CastMemberList';

describe('CastMemberList', () => {
	it('should correctly render', () => {
		const { asFragment } = renderWithProviders(<CastMemberList />);

		expect(asFragment()).toMatchSnapshot();
	});
});

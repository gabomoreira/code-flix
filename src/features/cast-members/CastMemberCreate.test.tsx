import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberCreate } from './CastMemberCreate';

const mockedStore = {};

describe('CastMemberCreate', () => {
	it('should correctly render', () => {
		const { asFragment } = renderWithProviders(<CastMemberCreate />);

		expect(asFragment()).toMatchSnapshot();
	});
});

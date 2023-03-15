import { render } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import { Header } from './Header';

describe('Header', () => {
	it('should render correctly', () => {
		const { asFragment } = renderWithProviders(<Header />);

		expect(asFragment()).toMatchSnapshot();
	});
});

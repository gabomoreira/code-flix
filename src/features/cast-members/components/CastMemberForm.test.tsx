import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMemberForm } from './CastMemberForm';

const Props = {
	castMember: {
		id: '1',
		name: 'Test',
		type: 1,
		deleted_at: null,
		created_at: '2023-02-28 19:28:19.418+00',
		updated_at: '2023-02-28 19:28:19.418+00',
	},
	isDisabled: false,
	isLoading: false,
	handleSubmit: jest.fn(),
	handleOnChange: jest.fn(),
};

describe('CastMemberForm', () => {
	it('should render castMember form correctly', () => {
		const { asFragment } = render(<CastMemberForm {...Props} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render castMember form with loading state', () => {
		const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it('should render castMember form with disable state', () => {
		const { asFragment } = render(<CastMemberForm {...Props} isDisabled />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});
});

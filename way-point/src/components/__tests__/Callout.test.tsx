import React from 'react';
import { render } from '@testing-library/react-native';
import Callout from '../Callout';

describe('Callout', () => {
	it('renders without crashing', () => {
		render(<Callout title="Title" description="Description" />);
	});

	it('renders the correct title and description', () => {
		const { getByText } = render(
			<Callout title="Title" description="Description" />,
		);
		expect(getByText('Title')).toBeTruthy();
		expect(getByText('Description')).toBeTruthy();
	});
});

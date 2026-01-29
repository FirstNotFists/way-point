import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ModalDemo } from '../ModalDemo';

// Mock navigation if needed
jest.mock('@react-navigation/native-stack', () => ({
	createNativeStackNavigator: jest.fn(() => ({
		Navigator: jest.fn(),
		Screen: jest.fn(),
	})),
}));

jest.mock('@granite-js/react-native', () => ({
	createRoute: (_path: string, config: never) => {
		config.useNavigation = jest.fn(() => ({
			navigate: jest.fn(),
			goBack: jest.fn(),
		}));
		return config;
	},
}));

describe('ModalDemo', () => {
	it('renders all modal buttons', () => {
		const { getByText } = render(<ModalDemoPage />);

		expect(getByText('Show Standard Modal')).toBeTruthy();
		expect(getByText('Show Alert Modal')).toBeTruthy();
		expect(getByText('Show Flexible Modal')).toBeTruthy();
	});

	it('shows standard modal when button is pressed', () => {
		const { getByText } = render(<ModalDemoPage />);

		// Assuming the title "Standard Modal" is only visible when modal is open
		// Since we are mocking Modal from react-native, we might need to be careful
		// But @testing-library/react-native handles standard Modal component

		fireEvent.press(getByText('Show Standard Modal'));
		expect(getByText('Standard Modal Title')).toBeTruthy();
		expect(
			getByText(/This is a standard modal with a title and content/),
		).toBeTruthy();
	});
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { InputDemo } from '../InputDemo';

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

describe('InputDemo', () => {
	it('renders all input states', () => {
		const { getByPlaceholderText, getByText } = render(<InputDemo />);

		expect(getByPlaceholderText('Default Input')).toBeTruthy();
		expect(getByText('Username')).toBeTruthy();
		expect(getByText('Email Address')).toBeTruthy();
		expect(getByText('This is an error message')).toBeTruthy();
		expect(getByPlaceholderText('Enter password')).toBeTruthy();
	});
});

import React from 'react';
import { render } from '@testing-library/react-native';
import ContentGrid from '../ui/ContentGrid';
import { Text } from 'react-native';

describe('ContentGrid', () => {
	const data = [
		{ id: '1', text: 'Item 1' },
		{ id: '2', text: 'Item 2' },
		{ id: '3', text: 'Item 3' },
		{ id: '4', text: 'Item 4' },
	];

	const renderItem = ({ item }: { item: { id: string; text: string } }) =>
		item ? <Text>{item.text}</Text> : null;

	it('renders without crashing', () => {
		render(<ContentGrid data={data} renderItem={renderItem} />);
	});
});

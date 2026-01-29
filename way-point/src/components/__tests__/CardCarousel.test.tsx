import React from 'react';
import { render } from '@testing-library/react-native';
import CardCarousel from '../CardCarousel';

describe('CardCarousel', () => {
	it('renders without crashing', () => {
		render(<CardCarousel data={[]} renderItem={() => null} />);
	});
});

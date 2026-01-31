import React from 'react';
import { render } from '@testing-library/react-native';
import WideCarousel from '../ui/WideCarousel';

describe('WideCarousel', () => {
	it('renders without crashing', () => {
		render(<WideCarousel data={[]} renderItem={() => null} />);
	});
});

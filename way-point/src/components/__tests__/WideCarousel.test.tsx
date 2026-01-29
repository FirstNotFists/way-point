import React from 'react';
import { render } from '@testing-library/react-native';
import WideCarousel from '../WideCarousel';

describe('WideCarousel', () => {
	it('renders without crashing', () => {
		render(<WideCarousel data={[]} renderItem={() => null} />);
	});
});

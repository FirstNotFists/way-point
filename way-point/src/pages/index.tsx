import React, { useState } from 'react';
import { View } from 'react-native';

import { createRoute } from '@granite-js/react-native';

import { styles } from './style';
import CommonButton from 'components/ui/button/Button';
import Checkbox from 'components/ui/checkbox/Checkbox';

export const Route = createRoute('/', {
	component: MainPage,
	screenOptions: {
		headerShown: false,
	},
});

export default function MainPage() {
	const navigation = Route.useNavigation();
	const [checked, setChecked] = useState(false);

	const goToAboutPage = () => {
		navigation.navigate('/about');
	};

	const toggleChecked = () => {
		setChecked(prev => !prev);
	};

	return (
		<View style={styles.container}>
			<Checkbox label="키워드명" checked={checked} onPress={toggleChecked} />
			<CommonButton label="버튼명" onPress={goToAboutPage} fontStyle="Bold" />
		</View>
	);
}

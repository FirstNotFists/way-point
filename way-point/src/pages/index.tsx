import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { createRoute } from '@granite-js/react-native';
import CommonButton from '../components/ui/button/Button';

export const Route = createRoute('/', {
	component: MainPage,
	screenOptions: {
		headerShown: false,
	},
});

export default function MainPage() {
	const navigation = Route.useNavigation();

	const goToAboutPage = () => {
		navigation.navigate('/about');
	};

	return (
		<View style={styles.container}>
			<CommonButton label="버튼명" onPress={goToAboutPage} fontStyle="Bold" />
		</View>
	);
}

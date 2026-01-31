import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export const Route = createRoute('/', {
	component: Page,
	screenOptions: {
		headerShown: false,
	},
});

function Page() {
	const navigation = Route.useNavigation();

	const goToAboutPage = () => {
		navigation.navigate('/about');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={goToAboutPage}>
				<Text style={styles.buttonText}>Go to About Page</Text>
			</TouchableOpacity>
		</View>
	);
}

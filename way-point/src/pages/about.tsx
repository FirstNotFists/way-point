import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const Route = createRoute('/about', {
	component: Page,
});

function Page() {
	const navigation = Route.useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>About Page</Text>
			<Text style={styles.description}>
				Granite is a powerful and flexible React Native Framework 🚀
			</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.buttonText}>Go Back</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0064FF',
		borderRadius: 8,
		paddingHorizontal: 24,
		paddingVertical: 12,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	description: {
		color: '#718096',
		fontSize: 16,
		marginBottom: 24,
		textAlign: 'center',
	},
	title: {
		color: '#1A202C',
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 16,
	},
});

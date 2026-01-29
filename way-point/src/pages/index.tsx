import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const Route = createRoute('/', {
	component: Page,
});

function Page() {
	const navigation = Route.useNavigation();

	const goToAboutPage = () => {
		navigation.navigate('/about');
	};

	const goToInputDemo = () => {
		navigation.navigate('/demo/input');
	};

	const goToModalDemo = () => {
		navigation.navigate('/demo/modal');
	};

	const goToMainDemo = () => {
		navigation.navigate('/demo/main');
	};

	return (
		<Container>
			<Text style={styles.title}>🎉 Welcome! 🎉</Text>
			<Text style={styles.subtitle}>
				This is a demo page for the{' '}
				<Text style={styles.brandText}>Granite</Text> Framework.
			</Text>
			<Text style={styles.description}>
				This page was created to showcase the features of the Granite.
			</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={goToAboutPage}>
					<Text style={styles.buttonText}>Go to About Page</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.demoButton]}
					onPress={goToInputDemo}
				>
					<Text style={styles.buttonText}>Input Demo</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.demoButton]}
					onPress={goToModalDemo}
				>
					<Text style={styles.buttonText}>Modal Demo</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.demoButton]}
					onPress={goToMainDemo}
				>
					<Text style={styles.buttonText}>Main Demo</Text>
				</TouchableOpacity>
			</View>
		</Container>
	);
}

function Container({ children }: { children: React.ReactNode }) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	brandText: {
		color: '#0064FF',
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#0064FF',
		borderRadius: 8,
		elevation: 5,
		paddingHorizontal: 32,
		paddingVertical: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		width: '100%',
	},
	buttonContainer: {
		alignItems: 'center',
		gap: 12,
		width: '100%',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	demoButton: {
		backgroundColor: '#4A5568',
	},
	description: {
		color: '#718096',
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 32,
		textAlign: 'center',
	},
	subtitle: {
		color: '#4A5568',
		fontSize: 18,
		marginBottom: 24,
		textAlign: 'center',
	},
	title: {
		color: '#1A202C',
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
});

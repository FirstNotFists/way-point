import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
	},
});

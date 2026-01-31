import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#3377F5',
		borderRadius: 12,
		display: 'flex',
		height: 48,
		justifyContent: 'center',
		width: '100%',
	},
	buttonDisabled: {
		backgroundColor: '#E1E1E1',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		textAlign: 'center',
	},
	buttonTextBold: {
		fontWeight: 'bold',
	},
	buttonTextDisabled: {
		color: '#99A0A7',
	},
	buttonTextMedium: {
		fontWeight: '500',
	},
	buttonTextRegular: {
		fontWeight: 'normal',
	},
});

export const fontStyleMap = {
	Regular: 'buttonTextRegular',
	Medium: 'buttonTextMedium',
	Bold: 'buttonTextBold',
} as const;

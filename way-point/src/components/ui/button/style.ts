import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#3377F5',
		borderRadius: 12,
		height: 48,
		justifyContent: 'center',
		overflow: 'hidden',
		width: '100%',
	},
	buttonDisabled: {
		backgroundColor: '#E1E1E1',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		textAlign: 'center',
		...(Platform.OS === 'android' && { includeFontPadding: false }),
	},
	buttonTextBold: {
		fontWeight: '700',
	},
	buttonTextDisabled: {
		color: '#99A0A7',
	},
	buttonTextMedium: {
		fontWeight: '500',
	},
	buttonTextRegular: {
		fontWeight: '400',
	},
});

export const fontStyleMap = {
	Regular: 'buttonTextRegular',
	Medium: 'buttonTextMedium',
	Bold: 'buttonTextBold',
} as const;

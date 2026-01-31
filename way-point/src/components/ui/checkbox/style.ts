import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	checkmark: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
		...(Platform.OS === 'android' && { includeFontPadding: false }),
	},
	checkmarkHidden: {
		opacity: 0,
	},
	container: {
		alignItems: 'center',
		borderRadius: 12,
		flexDirection: 'row',
		height: 60,
		justifyContent: 'space-between',
		overflow: 'hidden',
		paddingHorizontal: 16,
		width: '100%',
	},
	containerChecked: {
		backgroundColor: '#3377F5',
	},
	containerUnchecked: {
		backgroundColor: '#FFFFFF',
		borderColor: '#F2F3F4',
		borderWidth: 1,
	},
	label: {
		fontSize: 16,
		...(Platform.OS === 'android' && { includeFontPadding: false }),
	},
	labelBold: {
		fontWeight: '700',
	},
	labelChecked: {
		color: '#FFFFFF',
	},
	labelMedium: {
		fontWeight: '500',
	},
	labelRegular: {
		fontWeight: '400',
	},
	labelUnchecked: {
		color: '#99A0A7',
	},
});

export const fontStyleMap = {
	Bold: 'labelBold',
	Medium: 'labelMedium',
	Regular: 'labelRegular',
} as const;

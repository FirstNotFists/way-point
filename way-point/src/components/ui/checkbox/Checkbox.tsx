import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { fontStyleMap, styles } from './style';

interface CheckboxProps {
	label: string;
	checked: boolean;
	onPress: () => void;
	fontStyle?: keyof typeof fontStyleMap;
}

export default function Checkbox({
	label,
	checked,
	onPress,
	fontStyle = 'Bold',
}: CheckboxProps) {
	const labelFontStyleKey = fontStyleMap[fontStyle];

	return (
		<TouchableOpacity
			style={[
				styles.container,
				checked ? styles.containerChecked : styles.containerUnchecked,
			]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text
				style={[
					styles.label,
					styles[labelFontStyleKey],
					checked ? styles.labelChecked : styles.labelUnchecked,
				]}
			>
				{label}
			</Text>
			<Text style={[styles.checkmark, !checked && styles.checkmarkHidden]}>
				{'✓'}
			</Text>
		</TouchableOpacity>
	);
}

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { fontStyleMap, styles } from './style';

interface ButtonProps {
	onPress: () => void;
	label: string;
	disabled?: boolean;
	loading?: boolean;
	fontStyle?: keyof typeof fontStyleMap;
}

const CommonButton: React.FC<ButtonProps> = ({
	label,
	onPress,
	disabled,
	fontStyle = 'Bold',
}) => {
	const textStyleKey = fontStyleMap[fontStyle];

	return (
		<TouchableOpacity
			style={[styles.button, disabled && styles.buttonDisabled]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				style={[
					styles.buttonText,
					styles[textStyleKey],
					disabled && styles.buttonTextDisabled,
				]}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default CommonButton;

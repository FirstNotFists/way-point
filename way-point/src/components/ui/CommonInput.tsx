import React from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TextInputProps,
	ViewStyle,
} from 'react-native';

interface CommonInputProps extends TextInputProps {
	label?: string;
	error?: string;
	containerStyle?: ViewStyle;
}

const CommonInput: React.FC<CommonInputProps> = ({
	label,
	error,
	containerStyle,
	style,
	...props
}) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, error ? styles.inputError : null, style]}
				placeholderTextColor="#999"
				{...props}
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
		width: '100%',
	},
	errorText: {
		color: '#FF3B30',
		fontSize: 12,
		marginTop: 4,
	},
	input: {
		backgroundColor: '#FFFFFF',
		borderColor: '#BDBDBD',
		borderRadius: 12,
		borderWidth: 1,
		color: '#000',
		fontSize: 16,
		height: 48,
		paddingHorizontal: 12,
	},
	inputError: {
		borderColor: '#FF3B30',
	},
	label: {
		color: '#333',
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
	},
});

export default CommonInput;

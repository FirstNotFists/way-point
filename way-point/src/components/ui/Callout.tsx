import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface CalloutProps {
	title: string;
	description: string;
	style?: StyleProp<ViewStyle>;
}

const Callout: React.FC<CalloutProps> = ({ title, description, style }) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#e0f2f1',
		borderRadius: 8,
		marginBottom: 16,
		padding: 16,
	},
	description: {
		color: '#333',
		fontSize: 14,
	},
	title: {
		color: '#2e7d32',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});

export default Callout;

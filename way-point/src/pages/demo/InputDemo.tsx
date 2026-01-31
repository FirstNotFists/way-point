import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CommonInput from '../../components/ui/CommonInput';

export const Route = createRoute('/demo/input', {
	component: InputDemo,
});

function InputDemo() {
	return (
		<ScrollView style={styles.container}>
			<CommonInput placeholder="Default Input" />
			<CommonInput label="Input with Label" placeholder="Enter text" />
			<CommonInput
				label="Input with Error"
				placeholder="Enter text"
				error="This is an error message"
			/>
			<CommonInput
				placeholder="Password Input"
				secureTextEntry
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#F5F5F5',
	},
});
import { createRoute } from '@granite-js/react-native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CommonModal from '../../../components/ui/CommonModal';

export const Route = createRoute('/demo/modal', {
	component: ModalDemo,
});

function ModalDemo() {
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setModalVisible1(true)}
			>
				<Text style={styles.buttonText}>Show Standard Modal</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setModalVisible2(true)}
			>
				<Text style={styles.buttonText}>Show Alert Modal</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setModalVisible3(true)}
			>
				<Text style={styles.buttonText}>Show Flexible Content Modal</Text>
			</TouchableOpacity>

			<CommonModal
				visible={modalVisible1}
				onClose={() => setModalVisible1(false)}
				title="Standard Modal"
			>
				<Text>This is the content of the standard modal.</Text>
			</CommonModal>

			<CommonModal
				visible={modalVisible2}
				onClose={() => setModalVisible2(false)}
				title="Alert Modal"
			>
				<Text>This is an alert modal.</Text>
			</CommonModal>

			<CommonModal
				visible={modalVisible3}
				onClose={() => setModalVisible3(false)}
			>
				<Text>This is a modal with flexible content.</Text>
				<Text>You can add more content here.</Text>
			</CommonModal>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#0064FF',
		borderRadius: 8,
		marginBottom: 16,
		paddingHorizontal: 24,
		paddingVertical: 12,
		width: '100%',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
});

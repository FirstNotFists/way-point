import React from 'react';
import {
	StyleSheet,
	Modal,
	View,
	TouchableOpacity,
	Text,
	ViewStyle,
} from 'react-native';

interface CommonModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	containerStyle?: ViewStyle;
}

const CommonModal: React.FC<CommonModalProps> = ({
	visible,
	onClose,
	title,
	children,
	containerStyle,
}) => {
	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.overlay}
				activeOpacity={1}
				onPress={onClose}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={[styles.contentContainer, containerStyle]}
				>
					{title && (
						<View style={styles.header}>
							<Text style={styles.title}>{title}</Text>
						</View>
					)}
					<View style={styles.body}>{children}</View>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	body: {
		marginBottom: 20,
	},
	closeButton: {
		alignItems: 'center',
		backgroundColor: '#007AFF',
		borderRadius: 8,
		paddingVertical: 12,
	},
	closeButtonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '600',
	},
	contentContainer: {
		backgroundColor: '#FFF',
		borderRadius: 20,
		elevation: 3,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		width: '100%',
	},
	header: {
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 1,
		marginBottom: 16,
		paddingBottom: 8,
	},
	overlay: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		padding: 24,
	},
	title: {
		color: '#000',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default CommonModal;

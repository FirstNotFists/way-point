import React from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';

interface ContentGridProps {
	data: any[];
	renderItem: (item: any) => React.ReactNode;
	itemStyle?: any;
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 3; // 40 is the paddingHorizontal * 2

const ContentGrid: React.FC<ContentGridProps> = ({
	data,
	renderItem,
	itemStyle,
}) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<View style={[styles.item, { width: itemWidth }, itemStyle]}>
					{renderItem(item)}
				</View>
			)}
			keyExtractor={(item, index) => index.toString()}
			numColumns={3}
			contentContainerStyle={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
});

export default ContentGrid;

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface CardCarouselProps {
	data: any[];
	renderItem: (item: any) => React.ReactNode;
	cardWidth?: number;
	cardHeight?: number;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
	data,
	renderItem,
	cardWidth = 300,
	cardHeight = 200,
}) => {
	return (
		<FlatList
			data={data}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.contentContainer}
			renderItem={({ item }) => (
				<View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
					{renderItem(item)}
				</View>
			)}
			keyExtractor={(item, index) => index.toString()}
		/>
	);
};

const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 5,
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	contentContainer: {
		paddingHorizontal: 20,
	},
});

export default CardCarousel;

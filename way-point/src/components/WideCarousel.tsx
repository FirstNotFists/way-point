import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';

interface WideCarouselProps {
	data: any[];
	renderItem: (item: any) => React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');

const WideCarousel: React.FC<WideCarouselProps> = ({ data, renderItem }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleScroll = (event: any) => {
		const scrollPosition = event.nativeEvent.contentOffset.x;
		const index = Math.round(scrollPosition / screenWidth);
		setCurrentIndex(index);
	};

	const renderPagination = () => {
		return (
			<View style={styles.paginationContainer}>
				{data.map((_, index) => (
					<View
						key={index}
						style={[
							styles.paginationDot,
							index === currentIndex ? styles.paginationDotActive : null,
						]}
					/>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>{renderItem(item)}</View>
				)}
				keyExtractor={(item, index) => index.toString()}
				onScroll={handleScroll}
				onMomentumScrollEnd={event => {
					const scrollPosition = event.nativeEvent.contentOffset.x;
					const index = Math.round(scrollPosition / screenWidth);
					setCurrentIndex(index);
				}}
				scrollEventThrottle={16}
			/>
			{renderPagination()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	itemContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: screenWidth,
	},
	paginationContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	paginationDot: {
		backgroundColor: '#ddd',
		borderRadius: 4,
		height: 8,
		marginHorizontal: 5,
		width: 8,
	},
	paginationDotActive: {
		backgroundColor: '#333',
	},
});

export default WideCarousel;

import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import WideCarousel from '../../components/ui/WideCarousel';
import Callout from '../../components/ui/Callout';
import CardCarousel from '../../components/ui/CardCarousel';

export const Route = createRoute('/demo/main', {
	component: MainDemo,
});

function MainDemo() {
	const wideCarouselData = [
		{
			id: '1',
			title: 'Wide Item 1',
			description: 'This is a wide item',
			image: 'https://via.placeholder.com/300x150',
		},
		{
			id: '2',
			title: 'Wide Item 2',
			description: 'This is another wide item',
			image: 'https://via.placeholder.com/300x150',
		},
	];

	const cardCarouselData = [
		{
			id: '3',
			title: 'Card Item 1',
			description: 'This is a card item',
			image: 'https://via.placeholder.com/150x100',
		},
		{
			id: '4',
			title: 'Card Item 2',
			description: 'This is another card item',
			image: 'https://via.placeholder.com/150x100',
		},
	];

	const renderWideCarouselItem = (
		item: { id: string; title: string; description: string; image: string }
	) => (
		<View style={styles.wideCarouselItem}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);

	const renderCardCarouselItem = (
		item: { id: string; title: string; description: string; image: string }
	) => (
		<View style={styles.cardCarouselItem}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);

	return (
		<ScrollView style={styles.container}>
			<WideCarousel
				data={wideCarouselData}
				renderItem={renderWideCarouselItem}
			/>
			<Callout
				title="Callout Title"
				description="This is a callout description"
			/>
			<CardCarousel
				data={cardCarouselData}
				renderItem={renderCardCarouselItem}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardCarouselItem: {
		alignItems: 'center',
		padding: 10,
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
		paddingVertical: 20,
	},
	description: {
		fontSize: 14,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	wideCarouselItem: {
		alignItems: 'center',
		padding: 20,
	},
});

export default MainDemo;

import React from 'react';
import { Animated, Text, View } from 'react-native';
import { useSplash } from './hooks/useSplash';
import { styles } from './style';

export default function Splash() {
	const { fadeAnim, splashVisible } = useSplash();

	if (!splashVisible) return null;

	return (
		<Animated.View
			style={[styles.splash, { opacity: fadeAnim }]}
			pointerEvents="none"
		>
			<View style={styles.splashContent}>
				<Text style={styles.splashTitle}>Way Point</Text>
			</View>
		</Animated.View>
	);
}

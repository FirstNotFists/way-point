import React from 'react';
import { Animated, Text, View } from 'react-native';

import { styles } from './style';
import useSplash from './hooks/useSplash';

export default function Splash() {
	const { fadeAnim, splashVisible } = useSplash();

	if (!splashVisible) return null;

	return (
		<Animated.View
			style={[styles.splash, { opacity: fadeAnim }]}
			pointerEvents="none"
		>
			<View style={styles.splashContent}>
				<Text style={styles.splashTitle}>LOGO</Text>
			</View>
		</Animated.View>
	);
}

import React, {
	type PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Granite, type InitialProps } from '@granite-js/react-native';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { context } from '../require.context';

const SPLASH_DURATION_MS = 1500;

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
	const [splashVisible, setSplashVisible] = useState(true);
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start(() => setSplashVisible(false));
		}, SPLASH_DURATION_MS);

		return () => clearTimeout(timer);
	}, [fadeAnim]);

	return (
		<View style={styles.container}>
			{children}
			{splashVisible && (
				<Animated.View
					style={[styles.splash, { opacity: fadeAnim }]}
					pointerEvents="none"
				>
					<View style={styles.splashContent}>
						{/* 스플래시 로고/텍스트 - 필요에 따라 Image 또는 텍스트로 교체 */}
						<Text style={styles.splashTitle}>Way Point</Text>
					</View>
				</Animated.View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	splash: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	splashContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	splashTitle: {
		color: '#191f28',
		fontSize: 28,
		fontWeight: '700',
	},
});

export default Granite.registerApp(AppContainer, {
	appName: 'way-point',
	context,
});

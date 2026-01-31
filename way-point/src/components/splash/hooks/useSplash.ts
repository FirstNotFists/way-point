import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const SPLASH_DURATION_MS = 1500;
const FADE_OUT_DURATION_MS = 300;

const useSplash = () => {
	const [splashVisible, setSplashVisible] = useState(true);
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: FADE_OUT_DURATION_MS,
				useNativeDriver: true,
			}).start(() => setSplashVisible(false));
		}, SPLASH_DURATION_MS);

		return () => clearTimeout(timer);
	}, [fadeAnim]);

	return { fadeAnim, splashVisible };
};

export default useSplash;

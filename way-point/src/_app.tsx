import React, { type PropsWithChildren } from 'react';
import { Granite, type InitialProps } from '@granite-js/react-native';
import { context } from '../require.context';
import Splash from './components/splash/Splash';
import { View } from 'react-native';
import { globalStyle } from './globalStyle';

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
	return (
		<View style={globalStyle.container}>
			{children}
			<Splash />
		</View>
	);
}

export default Granite.registerApp(AppContainer, {
	appName: 'way-point',
	context,
});

import React, { Fragment } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
	useFonts as useMontserrat,
	Montserrat_400Regular,
	Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infrastructure/theme";
import SplashScreen from "./src/features/Splash/screen";
import Main from "./src/features/Main/screen";

export default function App() {
	const [montserratLoaded] = useMontserrat({
		Montserrat_400Regular,
		Montserrat_700Bold,
	});

	if (!montserratLoaded) {
		return null;
	}

	const userObject = {
		// name: "tosin",
		// age: 30,
	};

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				{userObject["age"] ? <Main /> : <SplashScreen />}
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</Fragment>
	);
}

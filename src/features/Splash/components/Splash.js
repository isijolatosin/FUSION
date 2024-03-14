import React from "react";
import LottieView from "lottie-react-native";
import { Dimensions, View } from "react-native";

import { OnboardingScreenText } from "./splash.styles";
import {
  homeSplashImage,
  splashOboardingSummaryText,
} from "../../../constants";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";

export default function index({ theme }) {
  const image = { uri: `${homeSplashImage}` };
  const { width } = Dimensions.get("window");
  return (
    <SafeArea>
      <View
        style={{
          flex: 0.9,
          width: width,
        }}>
        <LottieView
          source={require("../../../../assets/animations/welcome.json")}
          autoPlay
          loop
        />
      </View>
      <HorizontalPaddingSpace space={theme.space[5]}>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="body">
          Here is
        </Text>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base"
          fontType="arimaMadurai"
          fontSize="h2">
          Wiingr
        </Text>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="h5">
          An African community
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: -theme.spaceNumber[5],
          }}
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="h5">
          specially made for you.
        </Text>
      </HorizontalPaddingSpace>
      <HorizontalPaddingSpace space={theme.space[7]}>
        <Spacer position="top" size="small">
          <OnboardingScreenText>
            {splashOboardingSummaryText}
          </OnboardingScreenText>
        </Spacer>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}

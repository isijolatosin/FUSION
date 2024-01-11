import React from "react";

import { OnboardingSreencContainer } from "./splash.styles";
import { homeSplashImage } from "../../../constants";
import BrandAvatar from "../../../components/general-component/BrandAvatar";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";

export default function index() {
  const image = { uri: `${homeSplashImage}` };
  return (
    <OnboardingSreencContainer source={image}>
      <View style={{ position: "absolute", bottom: "6%", left: "10%" }}>
        <View style={{ width: "60%" }}>
          <Text
            variant="subHeading"
            colorType="basewhite"
            fontType="playfairbold"
            fontSize="h4">
            An African community specially made for you.
          </Text>
        </View>
        <BrandAvatar noFlex={true} width={70} />
      </View>
    </OnboardingSreencContainer>
  );
}

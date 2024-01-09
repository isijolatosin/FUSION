import React from "react";

import { OnboardingSreencContainer } from "./splash.styles";
import { homeSplashImage } from "../../../constants";
import BrandAvatar from "../../../components/general-component/BrandAvatar";
import { View } from "react-native";

export default function index() {
  const image = { uri: `${homeSplashImage}` };
  return (
    <OnboardingSreencContainer source={image}>
      <View style={{ position: "absolute", top: "56%", left: "30%" }}>
        <BrandAvatar noFlex={true} width={70} />
      </View>
    </OnboardingSreencContainer>
  );
}

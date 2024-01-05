import { View } from "react-native";
import React from "react";
import {
  LogoText,
  LogoWrapper,
} from "../../features/Splash/components/splash.styles";

export default function BrandAvatar({ noFlex }) {
  return (
    <View style={noFlex ? {} : { flex: 1 }}>
      <LogoWrapper width={50} height={50}>
        <LogoText size="caption">fusion</LogoText>
      </LogoWrapper>
    </View>
  );
}

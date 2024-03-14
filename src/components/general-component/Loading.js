import React from "react";
import LottieView from "lottie-react-native";

import { SafeArea } from "../utility/safe-area.component";
import { View } from "react-native";

export default function Loading({ theme }) {
  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.basewhite,
        justifyContent: "center",
      }}>
      <View
        style={{
          flex: 1,
          width: theme.spaceNumberBy50[2],
          alignSelf: "center",
        }}>
        <LottieView
          source={require("../../../assets/animations/loading.json")}
          autoPlay
          loop
        />
      </View>
    </SafeArea>
  );
}

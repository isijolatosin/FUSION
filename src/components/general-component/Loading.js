import React from "react";
import LottieView from "lottie-react-native";

import { SafeArea } from "../utility/safe-area.component";
import { View } from "react-native";

export default function Loading({ theme, isMessage }) {
  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.base,
        justifyContent: "center",
      }}>
      <View
        style={{
          flex: 1,
          width: theme.spaceNumberBy50[2],
          alignSelf: "center",
          opacity: isMessage ? 1 : 0.1,
        }}>
        <LottieView
          source={
            isMessage
              ? require("../../../assets/animations/message.json")
              : require("../../../assets/animations/gym-trans.json")
          }
          autoPlay
          loop
        />
      </View>
    </SafeArea>
  );
}

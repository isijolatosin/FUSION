import { Image, View } from "react-native";
import React from "react";
import {} from "../../features/Splash/components/splash.styles";

export default function BrandAvatar({ noFlex, width }) {
  return (
    <View style={noFlex ? {} : { flex: 1 }}>
      <View style={{ width: width }}>
        <Image
          source={require("../../../assets/fusion_logo.png")}
          style={{ width: "100%", resizeMode: "contain" }}
        />
      </View>
    </View>
  );
}

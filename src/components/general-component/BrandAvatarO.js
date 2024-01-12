import { Image, View } from "react-native";
import React from "react";

export default function BrandAvatarO({ noFlex, width }) {
  return (
    <View
      style={
        noFlex
          ? { width: width }
          : { flex: 1, justifyContent: "flex-start", width: width }
      }>
      <Image
        source={require("../../../assets/fusion_O.png")}
        style={{ width: "10%", resizeMode: "contain" }}
      />
    </View>
  );
}

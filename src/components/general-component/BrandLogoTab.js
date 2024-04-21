import React from "react";
import { Image, View } from "react-native";

export default function BrandLogoTab({ theme, width, height, focused }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.spaceNumberBy10[2],
        width: width,
        height: height,
        backgroundColor: focused
          ? theme.colors.brand.base
          : theme.colors.brand.basewhite,
      }}>
      <Image
        source={require("../../../assets/wiingr.png")}
        style={{
          resizeMode: "contain",
          width: focused ? theme.spaceNumber[15] : width,
          height: focused ? theme.spaceNumber[15] : height,

          tintColor: focused && theme.colors.brand.basewhite,
        }}
      />
    </View>
  );
}

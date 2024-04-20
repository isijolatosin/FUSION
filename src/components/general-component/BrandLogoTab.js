import React from "react";
import { Image } from "react-native";

export default function BrandLogoTab({ theme, widthHeight }) {
  return (
    <Image
      width={widthHeight ? widthHeight : theme.spaceNumberBy10[2]}
      height={widthHeight ? widthHeight : theme.spaceNumberBy10[2]}
      source={require("../../../assets/wiingr.png")}
      style={{
        resizeMode: "contain",
        width: widthHeight ? widthHeight : theme.spaceNumberBy10[2],
        height: widthHeight ? widthHeight : theme.spaceNumberBy10[2],
      }}
    />
  );
}

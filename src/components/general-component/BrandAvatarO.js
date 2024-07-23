import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "./ImageViewer";

export default function BrandAvatarO({ theme }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("support")}>
      <ImageViewer
        url={require("../../../assets/wiingr.png")}
        style={{
          resizeMode: "contain",
          width: theme.spaceNumberBy10[2],
          height: theme.spaceNumberBy10[2],
        }}
        width={theme.spaceNumberBy10[2]}
        height={theme.spaceNumberBy10[2]}
        isLocalUrl={true}
      />
    </Pressable>
  );
}

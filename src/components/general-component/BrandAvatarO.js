import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BrandAvatarO({ theme }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("support")}>
      <Image
        width={theme.spaceNumberBy10[2]}
        height={theme.spaceNumberBy10[2]}
        source={require("../../../assets/wiingr.png")}
        style={{
          resizeMode: "contain",
          width: theme.spaceNumberBy10[2],
          height: theme.spaceNumberBy10[2],
        }}
      />
    </Pressable>
  );
}

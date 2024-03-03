import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BrandAvatarO() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("support")}>
      <Image
        source={require("../../../assets/fusion_O.png")}
        style={{ resizeMode: "contain" }}
      />
    </Pressable>
  );
}

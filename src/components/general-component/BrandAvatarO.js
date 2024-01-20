import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/ThemeContext";

export default function BrandAvatarO({ noFlex, currentUser }) {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();

  return (
    <Pressable
      onPress={() => {
        if (currentUser?.role === process.env.EXPO_PUBLIC_ROLE)
          navigation.navigate("support");
      }}>
      <Image
        source={require("../../../assets/fusion_O.png")}
        style={{ resizeMode: "contain" }}
      />
    </Pressable>
  );
}

import React from "react";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BrandAvatarO({ noFlex, width, currentUser }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        if (currentUser?.role === process.env.EXPO_PUBLIC_ROLE)
          navigation.navigate("support");
      }}
      style={
        noFlex
          ? { width: width }
          : { flex: 1, justifyContent: "flex-start", width: width }
      }>
      <Image
        source={require("../../../assets/fusion_O.png")}
        style={{ width: "10%", resizeMode: "contain" }}
      />
    </Pressable>
  );
}

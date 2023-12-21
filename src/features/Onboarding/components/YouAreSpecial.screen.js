import React, { useState } from "react";
import { Dimensions } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { Text } from "../../../components/typography/text.component";

export default function YouAreSpecial({ navigation }) {
  const {
    state: { theme, user },
  } = useAppContext();
  const { height } = Dimensions.get("window");

  return (
    <SafeArea
      style={{
        height: `${height}px`,
        justifyContent: "center",
      }}>
      <Text>You are special!</Text>
    </SafeArea>
  );
}

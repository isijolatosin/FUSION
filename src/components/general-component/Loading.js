import React from "react";
import { useAppContext } from "../../context/ThemeContext";
import { SafeArea } from "../utility/safe-area.component";
import { Text } from "../typography/text.component";

export default function Loading({ text }) {
  const {
    state: { theme },
  } = useAppContext();

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.basewhite,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text variant="loading">{text}</Text>
    </SafeArea>
  );
}

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
        justifyContent: "center",
      }}>
      <Text
        style={{ textAlign: "center" }}
        variant="subHeading"
        colorType="base"
        fontType="montserratBold"
        fontSize="title">
        {text}
      </Text>
    </SafeArea>
  );
}

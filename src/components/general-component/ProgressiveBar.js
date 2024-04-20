import React from "react";
import { View } from "react-native";

export default function ProgressBar({ progress, theme }) {
  return (
    <View
      style={{
        width: "100%",
        height: theme.spaceNumber[1],
        backgroundColor: theme.colors.brand.highlight,
        borderRadius: theme.spaceNumber[1],
        overflow: "hidden",
        position: "relative",
      }}>
      <View
        style={[
          {
            height: "100%",
            backgroundColor: theme.colors.brand.base,
            borderRadius: 5,
          },
          { width: `${progress * 100}%` },
        ]}
      />
    </View>
  );
}

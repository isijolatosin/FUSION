import React from "react";
import { View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const HeaderComponent = ({
  title,
  textWidth,
  theme,
  LeftComp,
  RightComp,
  size,
  font,
  isBorder,
  topSpace,
  color,
  transform,
  borderColor,
}) => {
  return (
    <Spacer
      position="top"
      size={topSpace ? topSpace : "large"}
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: theme.spaceNumber[2],
        borderBottomColor: borderColor
          ? borderColor
          : theme.colors.brand.linesLighter,
        borderBottomWidth: isBorder ? 0.5 : 0,
        paddingBottom: isBorder ? theme.spaceNumber[2] : 0,
      }}>
      <LeftComp />
      <View style={{ flex: 1 }}>
        <Text
          style={{ textAlign: "center", width: textWidth ? textWidth : "100%" }}
          variant="custom"
          colorType={color ? color : "base1"}
          fontType={font ? font : "arimaMadurai"}
          lineHeight={theme.lineHeights[25]}
          transform={transform}
          fontSize={size ? size : "h5"}>
          {title}
        </Text>
      </View>
      <RightComp />
    </Spacer>
  );
};

export default HeaderComponent;

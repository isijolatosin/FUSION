import React from "react";
import { View } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const HeaderComponent = ({ title, theme, LeftComp, RightComp, size, font }) => {
  return (
    <Spacer
      position="top"
      size="large"
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: theme.spaceNumber[5],
      }}>
      <LeftComp />
      <View style={{ flex: 1 }}>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType={font ? font : "arimaMadurai"}
          fontSize={size ? size : "h5"}>
          {title}
        </Text>
      </View>
      <RightComp />
    </Spacer>
  );
};

export default HeaderComponent;

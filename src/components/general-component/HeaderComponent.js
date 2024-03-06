import React from "react";
import { View, StyleSheet } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import BrandAvatarO from "./BrandAvatarO";
import { Text } from "../typography/text.component";

const HeaderComponent = ({ title, theme, hideLogo }) => {
  return (
    <Spacer position="top" size="large">
      <HorizontalPaddingSpace
        space={theme.space[3]}
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}>
        {!hideLogo && (
          <View
            style={{
              position: "absolute",
              top: theme.spaceNumber[1],
              left: theme.spaceNumber[5],
            }}>
            <BrandAvatarO />
          </View>
        )}
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="h5">
          {title}
        </Text>
      </HorizontalPaddingSpace>
    </Spacer>
  );
};

export default HeaderComponent;

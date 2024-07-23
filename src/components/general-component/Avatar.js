import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AvatarWrapper } from "../../features/Main/screen/main.style";
import IconComponent from "../icon-components/IconComponent";
import ImageViewer from "./ImageViewer";

export default function Avatar({
  ringBorder,
  data,
  theme,
  dimensionIndex,
  func,
  isSmallIcon,
}) {
  return (
    <AvatarWrapper
      onPress={func}
      width={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      height={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      borderRadius={theme.spaceNumberBy50[1]}
      ringBorder={ringBorder}>
      {data ? (
        <ImageViewer
          url={data}
          style={{
            width: Platform.OS === "ios" ? "100%" : 10,
            height: Platform.OS === "ios" ? "100%" : 10,
            borderRadius: theme.spaceNumberBy50[1],
          }}
        />
      ) : (
        <View
          style={{
            width: Platform.OS === "ios" ? "100%" : 100,
            height: Platform.OS === "ios" ? "100%" : 100,
            backgroundColor: theme.colors.brand.linesLighter,
            borderRadius: theme.spaceNumberBy50[1],
            justifyContent: "center",
            alignItems: "center",
          }}>
          <IconComponent
            iconFunction={() => {}}
            iconName="user"
            IconComponent={AntDesign}
            size={isSmallIcon ? 20 : 60}
            color={theme.colors.brand.base6}
          />
        </View>
      )}
    </AvatarWrapper>
  );
}

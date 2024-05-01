import React from "react";
import { Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AvatarWrapper } from "../../features/Main/screen/main.style";
import IconComponent from "../icon-components/IconComponent";

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
        <Image
          source={{
            uri: `${data}`,
          }}
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
            size={isSmallIcon ? 30 : 60}
            color={theme.colors.brand.highlight}
          />
        </View>
      )}
    </AvatarWrapper>
  );
}

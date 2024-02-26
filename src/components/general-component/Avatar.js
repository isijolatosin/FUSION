import React from "react";
import { Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AvatarWrapper } from "../../features/Main/screen/main.style";
import IconComponent from "../icon-components/IconComponent";

export default function Avatar({ data, theme, dimensionIndex, func }) {
  return (
    <AvatarWrapper
      onPress={func}
      width={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      height={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      borderRadius={theme.spaceNumberBy50[1]}>
      {data ? (
        <Image
          source={{
            uri: `${data}`,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: theme.spaceNumberBy50[1],
          }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.brand.linesLighter,
            borderRadius: theme.spaceNumberBy50[1],
            justifyContent: "center",
            alignItems: "center",
          }}>
          <IconComponent
            iconFunction={() => {}}
            iconName="user"
            IconComponent={AntDesign}
            size={60}
            color={theme.colors.brand.highlight}
          />
        </View>
      )}
    </AvatarWrapper>
  );
}

import { Image } from "react-native";
import React from "react";
import { AvatarWrapper } from "../../features/Main/screen/main.style";

export default function Avatar({ data, theme, dimensionIndex, func }) {
  return (
    <AvatarWrapper
      onPress={func}
      width={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      height={theme.spaceNumberBy10[dimensionIndex ?? 5]}
      borderRadius={theme.spaceNumberBy50[1]}>
      <Image
        source={{
          uri: `${data?.mediaArray?.[0]}`,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: theme.spaceNumberBy50[1],
        }}
      />
    </AvatarWrapper>
  );
}

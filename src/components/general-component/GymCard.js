import React from "react";
import { Pressable } from "react-native";
import { Text } from "../typography/text.component";

const GymCard = ({ gym, theme, gymSelectedTypes, handleSelectedGym }) => {
  return (
    <Pressable
      onPress={() => handleSelectedGym(gym)}
      style={{
        borderWidth: 0.5,
        borderColor: theme.colors.brand.base8,
        paddingHorizontal: theme.spaceNumber[4],
        paddingVertical: theme.spaceNumber[2],
        borderRadius: theme.spaceNumberBy10[2],
        backgroundColor: gymSelectedTypes?.includes(gym)
          ? theme.colors.brand.black
          : "transparent",
      }}>
      <Text
        variant="custom"
        colorType={gymSelectedTypes?.includes(gym) ? "base4" : "base6"}
        fontType="montserratRegular"
        fontSize="xcaption">
        {gym}
      </Text>
    </Pressable>
  );
};

export default GymCard;

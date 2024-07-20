import React from "react";
import { Pressable } from "react-native";
import { Spacer } from "../spacer/spacer.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { Text } from "../typography/text.component";

const TopNavigationTab = ({
  arrayList,
  currentScreen,
  horizontalSpace,
  setFunction,
  theme,
  width,
}) => {
  return (
    <Spacer
      position="top"
      size="large"
      style={{
        borderBottomWidth: "1px",
        borderBottomColor: theme.colors.brand.linesLighter,
      }}>
      <HorizontalPaddingSpace
        space={horizontalSpace ?? theme.space[3]}
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: width,
          alignSelf: "center",
        }}>
        {arrayList.map((item) => (
          <Pressable
            onPress={() => setFunction(item)}
            key={item}
            style={{
              borderBottomWidth: theme.spaceNumber[0],
              borderBottomColor:
                item === currentScreen
                  ? theme.colors.brand.base1
                  : theme.colors.brand.base,
              paddingBottom: theme.spaceNumber[3],
            }}>
            <Text
              onPress={() => setFunction(item)}
              style={{
                textAlign: "center",
                color:
                  item === currentScreen
                    ? theme.colors.brand.base1
                    : theme.colors.brand.base7,
              }}
              variant="custom"
              colorType="black"
              fontType="montserratSemibold"
              fontSize="button"
              transform="capitalize">
              {item}
            </Text>
          </Pressable>
        ))}
      </HorizontalPaddingSpace>
    </Spacer>
  );
};

export default TopNavigationTab;

import React from "react";
import { View, Pressable, Switch } from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";

const TextAndIconComponent = ({
  currentUserGrantType,
  pressFunction,
  theme,
  title,
  value,
  font,
  size,
  isSwitch,
  disabled,
  compFunction,
}) => {
  return (
    <HorizontalPaddingSpace space={theme.space[2]}>
      <Pressable
        onPress={pressFunction}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingVertical: theme.spaceNumberBy10[0],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}>
        <View style={{ flex: 1 }}>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="button">
            {title}
          </Text>
          <View>
            <Text
              variant="custom"
              colorType="brandFadeLighter"
              fontType={font ? font : "montserratRegular"}
              fontSize={size ? size : "caption"}>
              {value}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginRight: isSwitch ? 0 : theme.spaceNumber[2],
          }}>
          {isSwitch ? (
            <View style={{ position: "relative" }}>
              <Switch
                disabled={disabled}
                trackColor={{
                  false: theme.colors.brand.linesLight,
                  true: theme.colors.brand.base,
                }}
                thumbColor={
                  currentUserGrantType
                    ? theme.colors.brand.highlight
                    : theme.colors.brand.lines
                }
                onValueChange={(val) => compFunction(val)}
                value={currentUserGrantType}
              />
              {disabled && (
                <View
                  style={{
                    position: "absolute",
                    right: theme.spaceNumber[0] + 1,
                    top: theme.spaceNumber[2],
                  }}>
                  <IconComponent
                    iconFunction={() => {}}
                    iconName="lock"
                    IconComponent={EvilIcons}
                    size={25}
                    color={theme.colors.brand.brandTone}
                  />
                </View>
              )}
            </View>
          ) : (
            <IconComponent
              iconFunction={() => {}}
              iconName="keyboard-arrow-right"
              IconComponent={MaterialIcons}
              size={20}
              color={theme.colors.brand.brandTone}
            />
          )}
        </View>
      </Pressable>
    </HorizontalPaddingSpace>
  );
};

export default TextAndIconComponent;

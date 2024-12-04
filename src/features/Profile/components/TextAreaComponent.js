import { View } from "react-native";
import React from "react";
import { Text } from "../../../components/typography/text.component";
import MultipleTextArea from "./MultipleTextArea";

export default function TextAreaComponent({
  text,
  theme,
  selectedHelpValue,
  setValue,
  placeholder,
}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.base8,
        borderRadius: theme.spaceNumber[2],
      }}>
      <View
        style={{
          paddingLeft: theme.spaceNumberBy10[1],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          paddingVertical: theme.spaceNumberBy10[0],
        }}>
        <Text
          style={{ textTransform: "capitalize" }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="body">
          {text}
        </Text>
      </View>
      <MultipleTextArea
        setValue={setValue}
        theme={theme}
        value={selectedHelpValue}
        placeholder={placeholder}
      />
    </View>
  );
}

import { View } from "react-native";
import React from "react";
import { Text } from "../../../components/typography/text.component";
import MultipleTextArea from "./MultipleTextArea";

export default function TextAreaComponent({
  text,
  theme,
  selectedHelpValue,
  setValue,
}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.brand.highlight,
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
          colorType="black"
          fontType="montserratSemibold"
          fontSize="body">
          {text}
        </Text>
      </View>
      <MultipleTextArea
        setValue={setValue}
        theme={theme}
        value={selectedHelpValue}
      />
    </View>
  );
}

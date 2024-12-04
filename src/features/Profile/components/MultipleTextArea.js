import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "../../../components/Input-Forms/input.styles";

export default function MultipleTextArea({
  setValue,
  theme,
  value,
  placeholder,
}) {
  return (
    <View style={{ padding: theme.spaceNumberBy10[1] }}>
      <TextInput
        autoFocus={true}
        backgroundColor="transparent"
        centralize={false}
        fontColor={theme.colors.brand.base1}
        fontSize={theme.fontSizes.body}
        fontType={theme.fonts.montserratRegular}
        isBorderBottomInput={false}
        includeIcon={false}
        keyboardType="default"
        multiline
        numberOfLines={4}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder ? placeholder : "Message..."}
        placeholderTextColor={theme.colors.brand.lines}
        theme={theme}
        value={value}
      />
    </View>
  );
}

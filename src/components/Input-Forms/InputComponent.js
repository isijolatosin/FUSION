import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useAppContext } from "../../context/ThemeContext";
import IconComponent from "../icon-components/IconComponent";
import { TextInput, TextInputWrapper, PlusText } from "./input.styles";

export default function InputComponent({
  includeIcon,
  centralize,
  keyboardType,
  setValue,
  value,
  width,
  isCountryCode,
  backgroundColor,
  isBackgroundColor,
  isBorderColor,
  fontSize,
  fontColor,
  fontType,
  maxlength,
  placeholder,
  allBorder,
  multiline,
  numberOfLines,
}) {
  const [switchIcon, setSwitchIcon] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  return (
    <TextInputWrapper
      width={width}
      backgroundColor={backgroundColor}
      isBackgroundColor={isBackgroundColor}
      isBorderColor={isBorderColor}
      allBorder={allBorder}>
      {isCountryCode && <PlusText fontColor={fontColor}>+</PlusText>}
      <TextInput
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType={keyboardType}
        theme={theme}
        includeIcon={includeIcon}
        placeholder={placeholder ? placeholder : ""}
        isBorderBottomInput={true}
        placeholderTextColor={theme.colors.brand.lines}
        fontType={fontType ?? theme.fonts.montserratLight}
        centralize={centralize}
        fontSize={fontSize}
        fontColor={fontColor}
        maxLength={maxlength}
        backgroundColor="transparent"
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {includeIcon && (
        <IconComponent
          iconFunction={() => setSwitchIcon(!switchIcon)}
          iconName={switchIcon ? "chevron-up" : "chevron-down"}
          IconComponent={Feather}
          size={15}
          theme={theme}
          horizontalLeftSpace={theme.space[1]}
          horizontalRightSpace={theme.space[1]}
        />
      )}
    </TextInputWrapper>
  );
}

import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useAppContext } from "../../context/ThemeContext";
import IconComponent from "../icon-components/IconComponent";
import { TextInput, TextInputWrapper, PlusText } from "./input.styles";

export default function InputComponent({
  autoCapitalize,
  autoFocus,
  includeIcon,
  centralize,
  keyboardType,
  setValue,
  value,
  width,
  inputMode,
  isCountryCode,
  backgroundColor,
  isBackgroundColor,
  isBorderColor,
  fontSize,
  placeholderFontSize,
  fontColor,
  fontType,
  maxlength,
  placeholder,
  allBorder,
  multiline,
  numberOfLines,
  secureTextEntry,
  keyboardAppearance,
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
        autoFocus={autoFocus}
        inputMode={inputMode}
        autoCapitalize={autoCapitalize}
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType={keyboardType}
        keyboardAppearance={keyboardAppearance ? keyboardAppearance : "light"}
        theme={theme}
        includeIcon={includeIcon}
        placeholder={placeholder ? placeholder : ""}
        isBorderBottomInput={true}
        placeholderTextColor={theme.colors.brand.lines}
        fontType={fontType ?? theme.fonts.montserratLight}
        centralize={centralize}
        fontSize={fontSize}
        placeholderFontSize={placeholderFontSize}
        fontColor={fontColor}
        maxLength={maxlength}
        backgroundColor="transparent"
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
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

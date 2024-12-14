import React from "react";

import { useAppContext } from "../../context/ThemeContext";
import { NumericInput, NumberInputWrapper } from "./input.styles";

export default function InputNumberComponent({
  autoFocus,
  centralize,
  setValue,
  value,
  width,
  height,

  backgroundColor,
  borderColor,
  borderRadius,

  placeholder,

  fontSize,
  fontColor,
  fontType,

  allBorder,
}) {
  const {
    state: { theme },
  } = useAppContext();

  return (
    <NumberInputWrapper
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      allBorder={allBorder}>
      <NumericInput
        autoFocus={autoFocus}
        inputMode="numeric"
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType="number-pad"
        theme={theme}
        placeholder={placeholder ? placeholder : ""}
        placeholderTextColor={theme.colors.brand.lines}
        fontType={fontType ?? theme.fonts.montserratLight}
        centralize={centralize}
        fontSize={fontSize}
        placeholderFontSize={fontSize}
        fontColor={fontColor}
        maxLength={2}
        backgroundColor={backgroundColor}
        keyboardAppearance="dark"
      />
    </NumberInputWrapper>
  );
}

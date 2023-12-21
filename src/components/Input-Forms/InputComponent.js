import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useAppContext } from "../../context/ThemeContext";
import IconComponent from "../icon-components/IconComponent";
import { TextInput, TextInputWrapper, PlusText } from "./input.styles";

export default function InputComponent({
  includeIcon,
  keyboardType,
  setValue,
  value,
  width,
  isCountryCode,
  isBackgroundColor,
  placeholder,
}) {
  const [switchIcon, setSwitchIcon] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  return (
    <TextInputWrapper width={width} isBackgroundColor={isBackgroundColor}>
      {isCountryCode && <PlusText>+</PlusText>}
      <TextInput
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType={keyboardType}
        theme={theme}
        includeIcon={includeIcon}
        placeholder={placeholder ? placeholder : ""}
        isBorderBottomInput={true}
        placeholderTextColor={theme.colors.text.disabled}
        fontType={theme.fonts.montserratLightItalic}
      />
      {includeIcon && (
        <IconComponent
          iconFunction={() => setSwitchIcon(!switchIcon)}
          iconName={switchIcon ? "chevron-up" : "chevron-down"}
          IconComponent={Feather}
          size={15}
          theme={theme}
          horizontalSpace={theme.space[1]}
        />
      )}
    </TextInputWrapper>
  );
}

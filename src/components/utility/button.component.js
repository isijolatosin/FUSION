import React from "react";
import {
  ButtonWrapper,
  ButtonText,
} from "../../features/Splash/components/splash.styles";

export default function Button({
  backgroundColor,
  borderRadius,
  isBorder,
  isNotBold,
  borderColor,
  buttonFunction,
  text,
  fontType,
  textColor,
  width,
}) {
  return (
    <ButtonWrapper
      onPress={buttonFunction}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      isBorder={isBorder}
      borderColor={borderColor}
      textColor={textColor}
      width={width}>
      <ButtonText
        fontType={fontType}
        textColor={textColor}
        isNotBold={isNotBold}>
        {text}
      </ButtonText>
    </ButtonWrapper>
  );
}

import React from "react";
import {
  ButtonWrapper,
  ButtonText,
} from "../../features/Splash/components/splash.styles";

export default function Button({
  backgroundColor,
  isBorder,
  isNotBold,
  borderColor,
  buttonFunction,
  text,
  textColor,
  width,
}) {
  return (
    <ButtonWrapper
      onPress={buttonFunction}
      backgroundColor={backgroundColor}
      isBorder={isBorder}
      borderColor={borderColor}
      textColor={textColor}
      width={width}>
      <ButtonText textColor={textColor} isNotBold={isNotBold}>
        {text}
      </ButtonText>
    </ButtonWrapper>
  );
}

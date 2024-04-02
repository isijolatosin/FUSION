import React from "react";
import {
  ButtonWrapper,
  ButtonText,
} from "../../features/Splash/components/splash.styles";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export default function Button({
  backgroundColor,
  borderRadius,
  isBorder,
  isIcon,
  isNotBold,
  loading,
  loadingText,
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
        {loading ? loadingText : text}
      </ButtonText>
      {isIcon && loading && (
        <View style={{ position: "absolute" }}>
          <ActivityIndicator size="medium" color={textColor} />
        </View>
      )}
    </ButtonWrapper>
  );
}

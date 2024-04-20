import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const NextNavigationText = styled.Text`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  font-size: ${(props) =>
    props.size ? props.size : props.theme.fontSizes.body};
`;

const NextNavigationWrapper = styled(TouchableOpacity)``;

export default function NextNavigation({
  theme,
  size,
  color,
  nextFunction,
  text,
}) {
  return (
    <NextNavigationWrapper onPress={nextFunction}>
      <NextNavigationText theme={theme} size={size} color={color}>
        {text ? text : "Next"}
      </NextNavigationText>
    </NextNavigationWrapper>
  );
}

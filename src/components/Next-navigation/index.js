import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

const NextNavigationText = styled.Text`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  ${(props) => props.size && `font-size: ${props.size}`}
`;

const NextNavigationWrapper = styled(Pressable)``;

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

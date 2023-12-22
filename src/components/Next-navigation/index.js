import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const NextNavigationText = styled.Text`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.fonts.montserratRegular};
  ${(props) => props.size && `font-size: ${props.size}`}
`;

const NextNavigationWrapper = styled(TouchableOpacity)``;

export default function NextNavigation({ theme, size, color, nextFunction }) {
  return (
    <NextNavigationWrapper onPress={nextFunction}>
      <NextNavigationText theme={theme} size={size} color={color}>
        Next
      </NextNavigationText>
    </NextNavigationWrapper>
  );
}

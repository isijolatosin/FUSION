import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const OnboardingWrapper = styled(View)`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const OnboardingScreenText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.base};
  text-align: center;
  font-size: ${(props) => props.theme.sizes[1]};
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
`;

const LogoWrapper = styled(View)`
  background-color: ${(props) => props.theme.colors.brand.base};
  width: ${(props) => (props.width ? props.width + "px" : 200 + "px")};
  height: ${(props) => (props.width ? props.width + "px" : 200 + "px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

const LogoText = styled(Text)`
  font-size: ${(props) =>
    props.size ? props.theme.fontSizes[props.size] : props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.montserratBold};
  color: ${(props) => props.theme.colors.brand.basewhite};
`;

const ButtonWrapper = styled(TouchableOpacity)`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => (props.width ? props.width : "100%")};
  padding-top: ${(props) => `${props.theme.spaceNumber[6]}px`};
  padding-bottom: ${(props) => `${props.theme.spaceNumber[6]}px`};
  border-width: ${(props) =>
    !props.isBorder ? "0px" : props.theme.letterSpacing[0]};
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : props.theme.space[5]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ButtonText = styled.Text`
  font-family: ${(props) =>
    props.fontType ? props.fontType : props.theme.fonts.montserratRegular};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.textColor};
  font-weight: ${(props) =>
    props.isNotBold
      ? props.theme.fontWeights.regular
      : props.theme.fontWeights.bold};
`;

export {
  OnboardingScreenText,
  OnboardingWrapper,
  LogoWrapper,
  LogoText,
  ButtonWrapper,
  ButtonText,
};

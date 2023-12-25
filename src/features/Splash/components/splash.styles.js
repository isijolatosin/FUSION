import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import styled from "styled-components/native";

const ScreenWrapper = styled(View)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  animation: fadeIn 5s;
`;

const OnboardingBG = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const OnboardingWrapper = styled(View)`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const OnboardingScreenText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.white};
  font-size: ${(props) => props.theme.sizes[1]};
  font-family: ${(props) => props.theme.fonts.montserratRegular};
`;

const LogoWrapper = styled(View)`
  background-color: ${(props) => props.theme.colors.brand.orange};
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

const LogoText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.montserratBold};
  color: ${(props) => props.theme.colors.ui.quaternary};
`;

const ButtonWrapper = styled(TouchableOpacity)`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  border-width: ${(props) =>
    !props.isBorder ? "0px" : props.theme.letterSpacing[0]};
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.theme.space[3]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ButtonText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.textColor};
  font-weight: ${(props) =>
    props.isNotBold
      ? props.theme.fontWeights.regular
      : props.theme.fontWeights.bold};
`;

export {
  ScreenWrapper,
  OnboardingBG,
  OnboardingScreenText,
  OnboardingWrapper,
  LogoWrapper,
  LogoText,
  ButtonWrapper,
  ButtonText,
};

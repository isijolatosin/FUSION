import styled from "styled-components/native";

const TextInputWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.isBackgroundColor
      ? props.backgroundColor
        ? props.theme.colors.brand[props.backgroundColor]
        : props.theme.colors.brand.highlight
      : ""};
  border-radius: ${(props) =>
    props.isBackgroundColor ? props.theme.space[1] : 0};
  padding: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) =>
    props.isBackgroundColor ? props.theme.space[3] : 0};
  padding-left: ${(props) =>
    props.isBackgroundColor ? props.theme.space[3] : 0};
  width: ${(props) => props.width};
  border-bottom-width: ${(props) =>
    props.isBackgroundColor ? 0 : props.theme.letterSpacing[0]};
  border-bottom-color: ${(props) =>
    props.isBackgroundColor
      ? ""
      : props.isBorderColor
      ? props.isBorderColor
      : props.theme.colors.brand.lines};
`;
const TextInput = styled.TextInput`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.fontSizes.body};
  font-family: ${(props) =>
    props.fontType ? props.fontType : props.theme.fonts.montserratSemibold};
  width: 100%;
  ${(props) => props.centralize && `text-align: center`};
  ${(props) => props.fontColor && `color: ${props.fontColor}`};
`;
const CodeInputWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenCodeTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const PlusText = styled.Text`
  margin-right: ${(props) => props.theme.space[1]};
  ${(props) => props.fontColor && `color: ${props.fontColor}`};
`;

const OTPInputContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const OTPInput = styled.View`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.brand.lines};
  min-width: 12%;
`;

const OTPInputText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.montserratSemibold};
  text-align: center;
  color: ${(props) => props.theme.colors.brand.black};
`;

const OTPInputFocused = styled(OTPInput)`
  background-color: ${(props) => props.theme.colors.brand.highlight};
`;

export {
  TextInputWrapper,
  CodeInputWrapper,
  TextInput,
  HiddenCodeTextInput,
  PlusText,
  OTPInputContainer,
  OTPInput,
  OTPInputText,
  OTPInputFocused,
};

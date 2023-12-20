import styled from "styled-components/native";

const TextInputWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brand.lightorange};
  border-radius: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[3]};
  width: ${(props) => props.width};
`;
const TextInput = styled.TextInput`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.semibold};
  width: 100%;
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
`;

const OTPInputContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const OTPInput = styled.View`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.semibold};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.text.disabled};
  min-width: 12%;
`;

const OTPInputText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.semibold};
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
`;

const OTPInputFocused = styled(OTPInput)`
  background-color: ${(props) => props.theme.colors.brand.lightorange};
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

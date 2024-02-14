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
    props.isBackgroundColor ? props.theme.space[3] : props.theme.space[2]};
  padding-left: ${(props) =>
    props.isBackgroundColor ? props.theme.space[3] : 0};
  width: ${(props) => (props.width ? props.width : "100%")};
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

const TextInputMessageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${(props) => (props.height ? `${props.height}px` : "100%")};
  background-color: ${(props) => props.backgroundColor};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  width: 100%;
`;

const TextMessageWrap = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  border-radius: ${(props) => props.borderRadius};
`;

const TextInputMessage = styled.TextInput`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontType};
  height: 100%;
  flex: 1;
`;

const TextInputMessageIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${(props) => `${props.theme.spaceNumber[5]}px`};
`;

const MessageContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: ${(props) => `${props.theme.spaceNumberBy10[0]}px`};
  padding-left: ${(props) => `${props.theme.spaceNumberBy10[1]}px`};
  padding-right: ${(props) => `${props.theme.spaceNumberBy10[1]}px`};
  background-color: ${(props) => props.theme.colors.brand.basewhite};
`;

const MessageBubbleWrap = styled.View`
  width: 100%;
  align-items: ${(props) => (props.currentUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.View`
  position: relative;
  background-color: ${(props) => props.theme.colors.brand.highlight};
  max-width: 85%;
  padding-left: ${(props) => `${props.theme.spaceNumber[7]}px`};
  padding-right: ${(props) => `${props.theme.spaceNumber[7]}px`};
  padding-top: ${(props) => `${props.theme.spaceNumber[9]}px`};
  padding-bottom: ${(props) => `${props.theme.spaceNumber[4]}px`};
  border-radius: ${(props) => `${props.theme.spaceNumber[4]}px`};
  ${(props) =>
    props.currentUser
      ? "border-bottom-right-radius: 0"
      : "border-bottom-left-radius: 0"};
  margin-bottom: ${(props) => `${props.theme.spaceNumber[8]}px`};
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
  TextInputMessageWrapper,
  TextInputMessage,
  TextMessageWrap,
  TextInputMessageIcon,
  MessageContainer,
  MessageBubble,
  MessageBubbleWrap,
};

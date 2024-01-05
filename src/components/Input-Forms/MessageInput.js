import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import IconComponent from "../icon-components/IconComponent";
import {
  TextInputMessage,
  TextInputMessageIcon,
  TextInputMessageWrapper,
  TextMessageWrap,
} from "./input.styles";

export default function MessageInput({ value, theme, setInput, sendMessage }) {
  return (
    <TextInputMessageWrapper
      height={`${theme.spaceNumberBy10[9]}px`}
      backgroundColor={theme.colors.brand.highlight}
      paddingHorizontal={`${theme.spaceNumberBy10[2]}px`}
      paddingTop={`${theme.spaceNumber[7]}px`}
      paddingBottom={`${theme.spaceNumberBy10[2]}px`}
      isBorderColor={false}>
      <TextMessageWrap
        backgroundColor={theme.colors.brand.basewhite}
        borderRadius={`${theme.spaceNumberBy10[1]}px`}
        paddingLeft={`${theme.spaceNumberBy10[1]}px`}
        paddingVertical={`${theme.spaceNumber[2]}px`}
        paddingRight={`${theme.spaceNumberBy10[0]}px`}>
        <TextInputMessage
          multiline={true}
          numberOfLines={4}
          enablesReturnKeyAutomatically={true}
          keyboardAppearance="dark"
          onChangeText={(text) => setInput(text)}
          value={value}
          keyboardType="default"
          theme={theme}
          placeholder="Send a message"
          placeholderTextColor={theme.colors.brand.lines}
          fontType={theme.fonts.montserratRegular}
          fontSize={theme.fontSizes.body}
          fontColor={theme.colors.brand.black}
        />
        <IconComponent
          iconFunction={sendMessage}
          iconName="send"
          IconComponent={MaterialIcons}
          size={25}
          theme={theme}
          horizontalSpace={theme.space[1]}
        />
      </TextMessageWrap>

      <TextInputMessageIcon>
        <IconComponent
          iconFunction={() => {}}
          iconName="camera"
          IconComponent={FontAwesome}
          size={30}
          theme={theme}
          horizontalSpace={theme.space[1]}
        />
        <IconComponent
          iconFunction={() => {}}
          iconName="microphone"
          IconComponent={FontAwesome}
          size={30}
          theme={theme}
          horizontalSpace={theme.space[1]}
        />
      </TextInputMessageIcon>
    </TextInputMessageWrapper>
  );
}

import React from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import IconComponent from "../icon-components/IconComponent";
import {
  TextInputMessage,
  TextInputMessageIcon,
  TextInputMessageWrapper,
  TextMessageWrap,
} from "./input.styles";

export default function MessageInput({
  value,
  theme,
  setInput,
  sendMessage,
  setOpenImageUploadModal,
}) {
  return (
    <TextInputMessageWrapper
      height={theme.spaceNumberBy10[6]}
      backgroundColor={theme.colors.brand.base8}
      paddingLeft={`${theme.spaceNumberBy10[0]}px`}
      paddingRight={`${theme.spaceNumberBy10[0]}px`}
      paddingTop={`${theme.spaceNumber[3]}px`}
      paddingBottom={`${theme.spaceNumberBy10[1]}px`}
      isBorderColor={false}>
      <TextMessageWrap
        backgroundColor={theme.colors.brand.base7}
        borderRadius={`${theme.spaceNumberBy10[1]}px`}
        paddingLeft={`${theme.spaceNumberBy10[1]}px`}
        paddingRight={`${theme.spaceNumberBy10[0]}px`}
        paddingTop={`${theme.spaceNumber[2]}px`}
        paddingBottom={`${theme.spaceNumber[2]}px`}>
        <TextInputMessage
          multiline={true}
          numberOfLines={4}
          enablesReturnKeyAutomatically={true}
          keyboardAppearance="light"
          onChangeText={(text) => setInput(text)}
          value={value}
          keyboardType="default"
          theme={theme}
          placeholder="..."
          placeholderTextColor={theme.colors.brand.lines}
          fontType={theme.fonts.montserratRegular}
          fontSize={theme.fontSizes.body}
          fontColor={theme.colors.brand.base1}
        />
        <IconComponent
          iconFunction={sendMessage}
          iconName="send-circle"
          IconComponent={MaterialCommunityIcons}
          size={30}
          theme={theme}
          horizontalLeftSpace={theme.space[1]}
          color={theme.colors.brand.base5}
        />
      </TextMessageWrap>

      <TextInputMessageIcon>
        <IconComponent
          iconFunction={() => setOpenImageUploadModal(true)}
          iconName="camera"
          IconComponent={FontAwesome}
          size={20}
          theme={theme}
          horizontalLeftSpace={theme.space[2]}
          horizontalRightSpace={theme.space[2]}
          color={theme.colors.brand.base5}
        />
      </TextInputMessageIcon>
    </TextInputMessageWrapper>
  );
}

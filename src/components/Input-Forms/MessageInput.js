import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import IconComponent from "../icon-components/IconComponent";
import {
  TextInputMessage,
  TextInputMessageIcon,
  TextInputMessageWrapper,
  TextMessageWrap,
} from "./input.styles";
// import { IconComponentWraper } from "../../features/Main/screen/main.style";

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
      backgroundColor={theme.colors.brand.highlight}
      paddingLeft={`${theme.spaceNumberBy10[0]}px`}
      paddingRight={`${theme.spaceNumberBy10[0]}px`}
      paddingTop={`${theme.spaceNumber[3]}px`}
      paddingBottom={`${theme.spaceNumberBy10[1]}px`}
      isBorderColor={false}>
      <TextMessageWrap
        backgroundColor={theme.colors.brand.basewhite}
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
          fontColor={theme.colors.brand.black}
        />
        <IconComponent
          iconFunction={sendMessage}
          iconName="send"
          IconComponent={MaterialIcons}
          size={25}
          theme={theme}
          horizontalLeftSpace={theme.space[1]}
        />
      </TextMessageWrap>

      <TextInputMessageIcon>
        <IconComponent
          iconFunction={() => setOpenImageUploadModal(true)}
          iconName="camera"
          IconComponent={FontAwesome}
          size={30}
          theme={theme}
          horizontalLeftSpace={theme.space[1]}
          horizontalRightSpace={theme.space[0]}
        />

        {/* To do done in phase 2 */}

        {/* <IconComponentWraper
          onPressIn={startRecording}
          onPressOut={stopRecording}
          horizontalLeftSpace={theme.space[2]}
          horizontalRightSpace={theme.space[2]}
          >
          <FontAwesome name="microphone" size={30} />
        </IconComponentWraper> */}
      </TextInputMessageIcon>
    </TextInputMessageWrapper>
  );
}

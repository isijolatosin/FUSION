import { View } from "react-native";
import React from "react";
import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import {
  detectImageUrl,
  detectUrl,
  shortenText,
} from "../../../utilities/detectTextType";

export default function MessagesListItem({
  photo,
  theme,
  name,
  lastSenderMessage,
  lastSenderName,
}) {
  let message = lastSenderMessage;
  if (detectImageUrl(lastSenderMessage)) {
    message = "Shared an image with you";
  } else if (detectUrl(lastSenderMessage)) {
    message = "shared a link with you";
  } else shortenText(lastSenderMessage, 40);

  let messageColor = "lines";
  if (lastSenderName === name) {
    messageColor = "base1";
  }
  if (detectImageUrl(lastSenderMessage) || detectUrl(lastSenderMessage)) {
    messageColor = "blue";
  }
  return (
    <HorizontalPaddingSpace space={theme.space[2]}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingBottom: theme.spaceNumber[7],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
        }}>
        <Avatar
          data={photo}
          theme={theme}
          dimensionIndex={theme.spaceNumber[1]}
          isSmallIcon={true}
        />
        <View style={{ marginLeft: theme.spaceNumber[6] }}>
          <Text
            variant="custom"
            colorType="base6"
            fontType="montserratExtrabold"
            fontSize="body">
            {name}
          </Text>
          <Spacer position="top" size="xsmall">
            <Text
              variant="custom"
              colorType={messageColor}
              fontType={
                lastSenderName === name ? "montserratBold" : "montserratLight"
              }
              fontSize="button">
              {lastSenderMessage ? message : ""}
            </Text>
          </Spacer>
        </View>
      </View>
    </HorizontalPaddingSpace>
  );
}

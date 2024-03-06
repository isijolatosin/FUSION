import { View } from "react-native";
import React from "react";
import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { shortenText } from "../../../utilities/detectTextType";

export default function MessagesListItem({
  photo,
  theme,
  name,
  lastSenderMessage,
  lastSenderName,
  flag,
}) {
  return (
    <HorizontalPaddingSpace space={theme.space[3]}>
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
            colorType="black"
            fontType="montserratExtrabold"
            fontSize="body">
            {name}{" "}
            {flag && (
              <Text
                variant="custom"
                colorType="brandFade"
                fontType="montserratRegular"
                fontSize="caption">
                {`(${flag})`}
              </Text>
            )}
          </Text>
          <Spacer position="top" size="xsmall">
            <Text
              variant="custom"
              colorType={lastSenderName === name ? "black" : "lines"}
              fontType={
                lastSenderName === name ? "montserratBold" : "montserratLight"
              }
              fontSize="button">
              {lastSenderMessage ? shortenText(lastSenderMessage, 40) : ""}
            </Text>
          </Spacer>
        </View>
      </View>
    </HorizontalPaddingSpace>
  );
}

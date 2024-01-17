import { TouchableOpacity, View } from "react-native";
import React from "react";
import * as MailComposer from "expo-mail-composer";

import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import { getDate, getTime } from "../../../utilities/formatTimestamp";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { shortenText } from "../../../utilities/detectTextType";

export default function SupportComponent({ data, theme, width }) {
  async function handleResponse(data) {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();

      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: [`${data?.email}`],
          subject: "Hello from Fusion!",
          body: "",
        });
      } else {
        console.log("Email is not available on this device.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  return (
    <HorizontalPaddingSpace space={theme.space[4]} style={{ width: width }}>
      <TouchableOpacity
        onPress={() => handleResponse(data)}
        style={{
          flexDirection: "row",
          marginBottom: theme.spaceNumberBy10[1],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumberBy10[1],
        }}>
        <Avatar
          dimensionIndex={theme.spaceNumber[1]}
          data={data?.photo}
          theme={theme}
        />
        <View
          style={{
            marginLeft: theme.spaceNumber[5],
            width: "100%",
            position: "relative",
          }}>
          <Text
            variant="title"
            colorType="base"
            fontType="montserratSemibold"
            fontSize="body"
            width="100%">
            {data?.firstname} {data?.lastname} - {data?.email}
          </Text>
          <View style={{ width: "85%" }}>
            <Text
              variant="title"
              colorType="black"
              fontType="montserratLight"
              fontSize="caption"
              width="100%">
              {shortenText(data?.message, 80)}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -theme.spaceNumber[6],
              right: theme.spaceNumberBy10[5],
            }}>
            <Text
              variant="title"
              colorType="lines"
              fontType="montserratLight"
              fontSize="xcaption"
              width="100%">
              {getDate(data?.timestamp)} - {getTime(data?.timestamp)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </HorizontalPaddingSpace>
  );
}

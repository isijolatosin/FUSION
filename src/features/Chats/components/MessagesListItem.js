import { View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";

export default function MessagesListItem({ data, theme }) {
  return (
    <HorizontalPaddingSpace space={theme.space[3]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}>
        <Avatar data={data} theme={theme} />
        <View style={{ marginLeft: theme.spaceNumber[6] }}>
          <Text
            variant="subHeading"
            colorType="black"
            fontType="montserratBold"
            fontSize="body">
            {data?.firstname}
          </Text>
          <Spacer position="top" size="xsmall">
            <Text
              variant="subHeading"
              colorType="black"
              fontType="montserratBold"
              fontSize="caption">
              Hey Amelia, how are you?
            </Text>
          </Spacer>
        </View>
      </View>
    </HorizontalPaddingSpace>
  );
}

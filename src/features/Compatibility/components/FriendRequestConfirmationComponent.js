import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";

export default function FriendRequestConfirmationComponent({
  theme,
  isVisible,
  onClose,
  selectedFriend,
}) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={{
        backgroundColor: theme.colors.brand.highlight,
        margin: 0,
        paddingBottom: theme.spaceNumberBy10[0],
      }}>
      <HorizontalPaddingSpace
        style={{ width: "100%", alignItems: "center", position: "relative" }}
        space={theme.space[7]}>
        <IconComponent
          iconFunction={() => {}}
          iconName="thumbs-up"
          IconComponent={Entypo}
          size={50}
          color={theme.colors.brand.base}
        />
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="large">
            <Text
              variant="custom"
              colorType="lines"
              fontType="montserratSemibold">
              Friend request sent to{" "}
              <Text
                variant="custom"
                colorType="base"
                fontType="montserratSemibold">
                {selectedFriend?.name}
              </Text>
            </Text>
          </Spacer>
        </Spacer>
        <Image
          style={{
            width: "100%",
            height: 350,
            resizeMode: "cover",
            borderRadius: theme.spaceNumberBy10[3],
          }}
          source={{
            uri: `${selectedFriend?.photo}`,
          }}
        />
        <TouchableOpacity
          style={{ position: "absolute", bottom: -theme.spaceNumberBy50[1] }}>
          <Text
            variant="custom"
            colorType="lines"
            fontType="montserratRegular"
            fontSize="caption">
            Click screen to exit
          </Text>
        </TouchableOpacity>
      </HorizontalPaddingSpace>
    </Modal>
  );
}

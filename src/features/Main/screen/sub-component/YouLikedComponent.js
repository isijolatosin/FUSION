import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";

export default function YouLikedComponent({
  theme,
  isVisible,
  onClose,
  likedUser,
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
        style={{ width: "100%", alignItems: "center" }}
        space={theme.space[7]}>
        <Spacer position="top" size="large">
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratSemibold">
            You liked {likedUser?.name}.
          </Text>
        </Spacer>
        <IconComponent
          iconFunction={() => {}}
          iconName="heart"
          IconComponent={MaterialCommunityIcons}
          size={60}
          color={theme.colors.brand.base}
        />
        <Image
          style={{
            width: "100%",
            height: 450,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{
            uri: `${likedUser?.photo}`,
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

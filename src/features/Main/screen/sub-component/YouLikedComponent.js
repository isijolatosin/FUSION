import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";
import ImageViewer from "../../../../components/general-component/ImageViewer";

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
        backgroundColor: theme.colors.brand.base,
        margin: 0,
        paddingBottom: theme.spaceNumberBy10[0],
      }}>
      <HorizontalPaddingSpace
        style={{ width: "100%", alignItems: "center" }}
        space={theme.space[7]}>
        <Spacer position="bottom" size="large">
          <Text
            variant="custom"
            colorType="base5"
            fontType="montserratRegular"
            fontSize="body">
            We have sent your request to {likedUser?.name}
          </Text>
        </Spacer>
        <ImageViewer
          style={{
            width: "100%",
            height: 350,
            resizeMode: "cover",
            borderRadius: theme.spaceNumberBy10[3],
          }}
          url={likedUser?.photo}
        />
        <TouchableOpacity
          style={{ position: "absolute", bottom: -theme.spaceNumberBy50[1] }}>
          <Text
            variant="custom"
            colorType="base6"
            fontType="montserratRegular"
            fontSize="caption">
            Click screen to exit
          </Text>
        </TouchableOpacity>
      </HorizontalPaddingSpace>
    </Modal>
  );
}

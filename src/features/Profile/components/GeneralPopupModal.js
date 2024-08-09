import React from "react";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { ButtonAction } from "../../Main/screen/main.style";
import { Text } from "../../../components/typography/text.component";

export default function GeneralPopupModal({
  theme,
  functionCallTop,
  functionCallBottom,
  textTop,
  textBottom,
  textCancel,
  setOpenImageUploadModal,
  horizontalSpace,
}) {
  return (
    <HorizontalPaddingSpace
      style={{ width: "100%", backgroundColor: theme.colors.brand.base }}
      space={horizontalSpace ? horizontalSpace : theme.space[5]}>
      <ButtonAction
        onPress={() => {
          functionCallTop();
        }}
        backgroundColor={theme.colors.brand.base8}
        width="100%"
        paddingTop={theme.spaceNumber[7]}
        paddingBottom={theme.spaceNumber[7]}
        alignItems="center"
        borderTopLeftRadius={theme.spaceNumber[2]}
        borderTopRightRadius={theme.spaceNumber[2]}
        borderBottomColor={theme.colors.brand.linesLight}
        borderBottomWidth={1}>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="body">
          {textTop}
        </Text>
      </ButtonAction>
      <ButtonAction
        onPress={() => {
          functionCallBottom();
        }}
        backgroundColor={theme.colors.brand.base8}
        width="100%"
        paddingTop={theme.spaceNumber[7]}
        paddingBottom={theme.spaceNumber[7]}
        alignItems="center"
        borderBottomLeftRadius={!textCancel && theme.spaceNumber[2]}
        borderBottomRightRadius={!textCancel && theme.spaceNumber[2]}
        borderBottomColor={textCancel && theme.colors.brand.linesLight}
        borderBottomWidth={textCancel && 1}>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="body">
          {textBottom}
        </Text>
      </ButtonAction>
      {textCancel && (
        <ButtonAction
          onPress={() => setOpenImageUploadModal(false)}
          backgroundColor={theme.colors.brand.base8}
          width="100%"
          paddingTop={theme.spaceNumber[7]}
          paddingBottom={theme.spaceNumber[7]}
          alignItems="center"
          borderBottomLeftRadius={theme.spaceNumber[2]}
          borderBottomRightRadius={theme.spaceNumber[2]}>
          <Text
            onPress={() => setOpenImageUploadModal(false)}
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="base1"
            fontType="montserratRegular"
            fontSize="body">
            {textCancel}
          </Text>
        </ButtonAction>
      )}
    </HorizontalPaddingSpace>
  );
}

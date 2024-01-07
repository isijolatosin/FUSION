import React from "react";
import { PopupModal } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { ButtonAction } from "../../Main/screen/main.style";
import { Text } from "../../../components/typography/text.component";

export default function PopupProfileImageModal({
  height,
  theme,
  functionCallTop,
  functionCallBottom,
  setTriggerRefresh,
  textTop,
  textBottom,
  textCancel,
  setOpenImageUploadModal,
  horizontalSpace,
  backgroundColor,
}) {
  return (
    <PopupModal backgroundColor={backgroundColor} height={height}>
      <HorizontalPaddingSpace
        style={{ width: "100%" }}
        space={horizontalSpace ?? theme.space[5]}>
        <ButtonAction
          onPress={() => functionCallTop()}
          backgroundColor={theme.colors.brand.highlight}
          width="100%"
          paddingTop={theme.spaceNumber[7]}
          paddingBottom={theme.spaceNumber[7]}
          alignItems="center"
          borderTopLeftRadius={theme.spaceNumber[2]}
          borderTopRightRadius={theme.spaceNumber[2]}
          borderBottomColor={theme.colors.brand.linesLight}
          borderBottomWidth={1}>
          <Text
            style={{}}
            variant="subHeading"
            colorType="black"
            fontType="montserratSemibold"
            fontSize="body">
            {textTop}
          </Text>
        </ButtonAction>
        <ButtonAction
          onPress={() => functionCallBottom()}
          backgroundColor={theme.colors.brand.highlight}
          width="100%"
          paddingTop={theme.spaceNumber[7]}
          paddingBottom={theme.spaceNumber[7]}
          alignItems="center"
          borderBottomLeftRadius={!textCancel && theme.spaceNumber[2]}
          borderBottomRightRadius={!textCancel && theme.spaceNumber[2]}
          borderBottomColor={textCancel && theme.colors.brand.linesLight}
          borderBottomWidth={textCancel && 1}>
          <Text
            onPress={() => {
              setTriggerRefresh(false);
              functionCallBottom();
            }}
            variant="subHeading"
            colorType="black"
            fontType="montserratSemibold"
            fontSize="body">
            {textBottom}
          </Text>
        </ButtonAction>
        {textCancel && (
          <ButtonAction
            onPress={() => setOpenImageUploadModal(false)}
            backgroundColor={theme.colors.brand.highlight}
            width="100%"
            paddingTop={theme.spaceNumber[7]}
            paddingBottom={theme.spaceNumber[7]}
            alignItems="center"
            borderBottomLeftRadius={theme.spaceNumber[2]}
            borderBottomRightRadius={theme.spaceNumber[2]}>
            <Text
              onPress={() => {
                setTriggerRefresh(false);
                functionCallBottom(false);
              }}
              variant="subHeading"
              colorType="black"
              fontType="montserratSemibold"
              fontSize="body">
              {textCancel}
            </Text>
          </ButtonAction>
        )}
      </HorizontalPaddingSpace>
    </PopupModal>
  );
}

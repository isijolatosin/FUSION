import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";

import { PopupModal } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { ButtonAction } from "../../Main/screen/main.style";
import { Text } from "../../../components/typography/text.component";
import { unmatchmessage } from "../../../constants";
import { TouchableOpacity, View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import ActionNotificationModal from "../../../components/general-component/ActionNotificationModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import { SafeArea } from "../../../components/utility/safe-area.component";

export default function MessageDotsPopupModal({
  height,
  theme,
  functionCallTop,
  functionCallBottom,
  otherUserMatchId,
  otherUserMatchPhonenumber,
  textTop,
  textBottom,
  textCancel,
  setOpenImageUploadModal,
  horizontalSpace,
}) {
  const [showUnmatchCard, setShowUnmatchCard] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  function BlockOptionComponent({ text }) {
    return (
      <TouchableOpacity
        onPress={() => {
          functionCallBottom(otherUserMatchPhonenumber, otherUserMatchId, text);
        }}
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
        }}>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: theme.spaceNumberBy10[2],
            paddingTop: theme.spaceNumberBy10[1],
            paddingBottom: theme.spaceNumberBy10[1],
          }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="body">
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  if (showUnmatchCard) {
    return (
      <AnimatedModal
        isVisible={showUnmatchCard}
        onClose={() => setShowUnmatchCard(false)}
        theme={theme}
        width="100%">
        <ActionNotificationModal
          title="Are you sure?"
          buttonText="Unmatch"
          height={height}
          message={unmatchmessage}
          theme={theme}
          functionCall={() => functionCallTop()}
          onClose={() => setShowUnmatchCard(false)}
          horizontalSpace={horizontalSpace}
        />
      </AnimatedModal>
    );
  }

  if (showBlockModal) {
    return (
      <AnimatedModal
        isVisible={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        theme={theme}
        width="100%">
        <SafeArea
          style={{
            width: "100%",
            justifyContent: "flex-start",
            display: "flex",
            marginTop: theme.spaceNumberBy50[1],
          }}>
          <Spacer position="bottom" size="medium">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="base1"
              fontType="arimaMadurai"
              fontSize="h4">
              Block this person
            </Text>
          </Spacer>
          <HorizontalPaddingSpace
            style={{
              flex: 1,
              width: "100%",
              position: "relative",
              backgroundColor: theme.colors.brand.base8,
              paddingTop: theme.spaceNumberBy10[2],
              paddingBottom: theme.spaceNumberBy10[10],
            }}
            space={theme.space[0]}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.brand.linesLight,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  paddingHorizontal: theme.spaceNumberBy10[2],
                  paddingBottom: theme.spaceNumberBy10[1],
                }}
                variant="custom"
                colorType="base5"
                fontType="montserratRegular"
                fontSize="body">
                Your reason for blocking this user would remain anonymous. This
                user would not be updated on your action.
              </Text>
            </View>
            <BlockOptionComponent text="Fake Profile" />
            <BlockOptionComponent text="Underage" />
            <BlockOptionComponent text="Out of Wiingr behaviour" />
            <BlockOptionComponent text="No longer my style" />
            <BlockOptionComponent text="Scam" />
            <TouchableOpacity
              onPress={() => {
                functionCallBottom(
                  otherUserMatchPhonenumber,
                  otherUserMatchId,
                  "Rude or Offensive behaviour"
                );
              }}
              style={{
                width: "100%",
              }}>
              <Text
                style={{
                  textAlign: "center",
                  paddingHorizontal: theme.spaceNumberBy10[2],
                  paddingTop: theme.spaceNumberBy10[1],
                  paddingBottom: theme.spaceNumberBy10[1],
                }}
                variant="custom"
                colorType="base1"
                fontType="montserratRegular"
                fontSize="body">
                Rude or Offensive behaviour
              </Text>
            </TouchableOpacity>
          </HorizontalPaddingSpace>
          <View
            style={{
              position: "absolute",
              right: theme.spaceNumberBy10[1],
              top: theme.spaceNumber[3],
              backgroundColor: theme.colors.brand.base,
              position: "absolute",
              marginLeft: theme.spaceNumberBy10[1],
              padding: theme.spaceNumber[3],
              borderRadius: theme.spaceNumberBy10[2],
            }}>
            <IconComponent
              iconFunction={() => setShowBlockModal(false)}
              iconName="close-a"
              IconComponent={Fontisto}
              size={theme.spaceNumber[5]}
              color={theme.colors.brand.basewhite}
            />
          </View>
        </SafeArea>
      </AnimatedModal>
    );
  }

  return (
    <HorizontalPaddingSpace
      style={{ width: "100%" }}
      space={horizontalSpace ? horizontalSpace : theme.space[5]}>
      <ButtonAction
        onPress={() => setShowUnmatchCard(true)}
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
          fontType="montserratSemibold"
          fontSize="body">
          {textTop}
        </Text>
      </ButtonAction>
      <ButtonAction
        onPress={() => setShowBlockModal(true)}
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
          onPress={() => {
            setShowBlockModal(true);
          }}
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="montserratSemibold"
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
            fontType="montserratSemibold"
            fontSize="body">
            {textCancel}
          </Text>
        </ButtonAction>
      )}
    </HorizontalPaddingSpace>
  );
}

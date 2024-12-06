import React, { useState } from "react";
import { Entypo, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { ButtonAction } from "../../Main/screen/main.style";
import { Text } from "../../../components/typography/text.component";
import { reportMessage, unmatchmessage } from "../../../constants";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import ActionNotificationModal from "../../../components/general-component/ActionNotificationModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import { SafeArea } from "../../../components/utility/safe-area.component";
import TextAreaComponent from "../../Profile/components/TextAreaComponent";
import Button from "../../../components/utility/button.component";
import { handlePickImageAsync } from "../../../utilities/handleUploadImage";
import firebase, { database } from "../../../../config";
import generateUniqueId from "../../../utilities/generateUniqueCode";

export default function MessageDotsPopupModal({
  width,
  height,
  theme,
  functionCallTop,
  functionCallBottom,
  otherUserMatchId,
  otherUserMatchPhonenumber,
  topText,
  bottomText,
  cancelText,
  reportText,
  currentUser,
  setOpenImageUploadModal,
  horizontalSpace,
}) {
  const [image, setImage] = useState("");
  const [showUnmatchCard, setShowUnmatchCard] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportCard, setShowReportCard] = useState(false);
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [selectedHelpValue, setSelectedHelpValue] = useState("");

  function BlockOptionComponent({ text, func, isReport }) {
    return (
      <TouchableOpacity
        onPress={() => {
          isReport
            ? func(text)
            : func(otherUserMatchPhonenumber, otherUserMatchId, text);
        }}
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          backgroundColor: theme.colors.brand.base,
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

  async function handleImageUpload() {
    const image = await handlePickImageAsync(
      () => {},
      () => {},
      "",
      false,
      false,
      () => {},
      true,
      () => {}
    );
    setImage(image);
  }

  async function handleSubmit() {
    const hashReportId = selectedReportCategory.slice(0, 4);

    database
      .collection("reports")
      .add({
        name: currentUser.firstname,
        image: image,
        offenderid: otherUserMatchId,
        offenderphonenumber: otherUserMatchPhonenumber,
        reportid: generateUniqueId(`${hashReportId}_`),
        reporterid: generateUniqueId(`user${currentUser?.phonenumber}_`),
        reporteremail: currentUser?.email,
        reporterphonenumber: currentUser?.phonenumber,
        reason: selectedHelpValue,
        status: "submitted for review",
        title: selectedReportCategory,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`USER ADDED SUCCESSFULLY`);
        setShowSessionComplete(true);
        setImage("");
        setSelectedHelpValue("");
      })
      .catch((error) => console.log("Error " + error.message));
  }

  if (selectedReportCategory) {
    return (
      <AnimatedModal
        isVisible={!!selectedReportCategory}
        onClose={() => {
          setSelectedReportCategory("");
          setSelectedHelpValue("");
        }}
        theme={theme}
        isPaddingTop={true}
        width="100%">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <HorizontalPaddingSpace
              style={{ width: width, marginBottom: theme.spaceNumberBy50[0] }}
              space={theme.space[7]}>
              <Spacer position="bottom" size="medium">
                <TextAreaComponent
                  text={selectedReportCategory}
                  theme={theme}
                  selectedHelpValue={selectedHelpValue}
                  setValue={setSelectedHelpValue}
                  placeholder="Description"
                />
              </Spacer>
              <Text
                style={{ textAlign: "left" }}
                variant="custom"
                colorType="base1"
                fontType="montserratLight"
                fontSize="caption">
                Attach image (optional){" "}
                <IconComponent
                  iconFunction={handleImageUpload}
                  iconName="attachment"
                  IconComponent={Entypo}
                  size={theme.spaceNumber[7]}
                  color={theme.colors.brand.error}
                />
                {image && (
                  <Text
                    style={{ textAlign: "left" }}
                    variant="custom"
                    colorType="blue"
                    fontType="montserratLight"
                    fontSize="caption">{`  ${image.slice(0, 5)}...`}</Text>
                )}
              </Text>
              <Spacer position="top" size="xxlarge">
                <Button
                  backgroundColor={theme.colors.brand.base8}
                  borderRadius={`${theme.spaceNumber[8]}px`}
                  isBorder={false}
                  isNotBold={false}
                  buttonFunction={handleSubmit}
                  text="Submit"
                  fontType={theme.fonts.montserratSemibold}
                  textColor={theme.colors.brand.base1}
                  width="100%"
                />
              </Spacer>
              <AnimatedModal
                isVisible={showSessionComplete}
                onClose={() => {
                  setShowSessionComplete(false);
                  setSelectedReportCategory("");
                }}
                theme={theme}
                isJustifyContent="center"
                width={width}>
                <HorizontalPaddingSpace
                  style={{
                    width: width,
                    marginBottom: theme.spaceNumberBy50[0],
                  }}
                  space={theme.space[7]}>
                  <View
                    style={{
                      position: "absolute",
                      right: theme.spaceNumberBy10[3],
                      top: -theme.spaceNumberBy50[4],
                    }}>
                    <IconComponent
                      iconFunction={() => {
                        setShowSessionComplete(false);
                        setSelectedReportCategory("");
                      }}
                      iconName="close-a"
                      IconComponent={Fontisto}
                      size={theme.spaceNumber[8]}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Spacer position="top" size="xxlarge">
                    <Spacer position="top" size="xxlarge">
                      <Text
                        style={{ textAlign: "center" }}
                        variant="custom"
                        colorType="base1"
                        fontType="montserratLight"
                        fontSize="button">
                        {reportMessage}
                      </Text>
                    </Spacer>
                  </Spacer>
                </HorizontalPaddingSpace>
              </AnimatedModal>
            </HorizontalPaddingSpace>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </AnimatedModal>
    );
  }

  if (showUnmatchCard) {
    return (
      <AnimatedModal
        isVisible={showUnmatchCard}
        onClose={() => setShowUnmatchCard(false)}
        theme={theme}
        isPaddingTop={true}
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

  if (showReportCard) {
    return (
      <AnimatedModal
        isVisible={showReportCard}
        onClose={() => setShowReportCard(false)}
        theme={theme}
        width="100%">
        <SafeArea
          style={{
            width: "100%",
            justifyContent: "flex-start",
            display: "flex",
            marginTop: theme.spaceNumberBy50[1],
            backgroundColor: theme.colors.brand.base,
          }}>
          <Spacer position="bottom" size="medium">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="base1"
              fontType="arimaMadurai"
              fontSize="h4">
              Report this user{" "}
              <Spacer position="bottom" size="small">
                <IconComponent
                  iconFunction={() => {}}
                  iconName="flag-triangle"
                  IconComponent={MaterialCommunityIcons}
                  size={theme.spaceNumber[10]}
                  color={theme.colors.brand.error}
                />
              </Spacer>
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
                Your reason for reporting this user would remain anonymous. This
                user would not be updated on your action.
              </Text>
            </View>
            <BlockOptionComponent
              text="Spam"
              func={setSelectedReportCategory}
              isReport={true}
            />
            <BlockOptionComponent
              text="Hate speech"
              func={setSelectedReportCategory}
              isReport={true}
            />
            <BlockOptionComponent
              text="Harassment/Bullying"
              func={setSelectedReportCategory}
              isReport={true}
            />
            <BlockOptionComponent
              text="Violence or Threats"
              func={setSelectedReportCategory}
              isReport={true}
            />
            <BlockOptionComponent
              text="Explicit Content"
              func={setSelectedReportCategory}
              isReport={true}
            />
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
              iconFunction={() => setShowReportCard(false)}
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
            backgroundColor: theme.colors.brand.base,
          }}>
          <Spacer position="bottom" size="medium">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="base1"
              fontType="arimaMadurai"
              fontSize="h4">
              Block this user
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
            <BlockOptionComponent
              text="Fake Profile"
              func={functionCallBottom}
            />
            <BlockOptionComponent text="Underage" func={functionCallBottom} />
            <BlockOptionComponent
              text="Out of Wiingr behaviour"
              func={functionCallBottom}
            />
            <BlockOptionComponent
              text="No longer my style"
              func={functionCallBottom}
            />
            <BlockOptionComponent text="Scam" func={functionCallBottom} />
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
          {topText}
        </Text>
      </ButtonAction>
      <ButtonAction
        onPress={() => setShowBlockModal(true)}
        backgroundColor={theme.colors.brand.base8}
        width="100%"
        paddingTop={theme.spaceNumber[7]}
        paddingBottom={theme.spaceNumber[7]}
        alignItems="center"
        borderBottomLeftRadius={!cancelText && theme.spaceNumber[2]}
        borderBottomRightRadius={!cancelText && theme.spaceNumber[2]}
        borderBottomColor={cancelText && theme.colors.brand.linesLight}
        borderBottomWidth={cancelText && 1}>
        <Text
          onPress={() => {
            setShowBlockModal(true);
          }}
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="montserratSemibold"
          fontSize="body">
          {bottomText}
        </Text>
      </ButtonAction>
      <ButtonAction
        onPress={() => setShowReportCard(true)}
        backgroundColor={theme.colors.brand.base8}
        width="100%"
        paddingTop={theme.spaceNumber[7]}
        paddingBottom={theme.spaceNumber[7]}
        alignItems="center"
        borderBottomLeftRadius={!cancelText && theme.spaceNumber[2]}
        borderBottomRightRadius={!cancelText && theme.spaceNumber[2]}
        borderBottomColor={cancelText && theme.colors.brand.linesLight}
        borderBottomWidth={cancelText && 1}>
        <Text
          onPress={() => {
            setShowReportCard(true);
          }}
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="montserratSemibold"
          fontSize="body">
          {reportText}
          <IconComponent
            iconFunction={() => {}}
            iconName="flag-triangle"
            IconComponent={MaterialCommunityIcons}
            size={theme.spaceNumber[10]}
            color={theme.colors.brand.error}
          />
        </Text>
      </ButtonAction>
      {cancelText && (
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
            {cancelText}
          </Text>
        </ButtonAction>
      )}
    </HorizontalPaddingSpace>
  );
}

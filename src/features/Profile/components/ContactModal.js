import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

import AnimatedModal from "../../../components/general-component/AnimatedModal";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import Button from "../../../components/utility/button.component";
import TextAreaComponent from "./TextAreaComponent";
import firebase, { database } from "../../../../config";
import Spinner from "../../../components/general-component/Spinner";

export default function ContactModal({
  currentUser,
  messageSentNote,
  openContactModal,
  onCloseContactModal,
  selectedHelp,
  selectedHelpValue,
  setMessageSentNote,
  setSelectedHelp,
  setSelectedHelpValue,
  theme,
  width,
}) {
  const [isSendingMessage, setSendingMessage] = useState(false);
  function handleSendMessage(selectedHelp, selectedHelpValue) {
    setSendingMessage(true);
    if (!selectedHelpValue) return;

    database.collection("general-support").add({
      email: currentUser?.email,
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname ?? "",
      message: selectedHelpValue,
      phonenumber: currentUser?.phonenumber,
      photo: currentUser?.mediaArray[0],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      topic: selectedHelp,
    });

    setSelectedHelpValue("");
    const contactTimeoutId = setTimeout(() => {
      setMessageSentNote(true);
      setSendingMessage(false);
    }, 2000);

    return () => clearTimeout(contactTimeoutId);
  }
  return (
    <AnimatedModal
      isVisible={openContactModal}
      onClose={onCloseContactModal}
      isJustifyContent="center"
      theme={theme}>
      {!selectedHelp ? (
        <HorizontalPaddingSpace
          style={{ width: width, backgroundColor: theme.colors.brand.base }}
          space={theme.space[7]}>
          <View>
            <View style={{ position: "absolute", right: 0 }}>
              <IconComponent
                iconFunction={onCloseContactModal}
                iconName="close-a"
                IconComponent={Fontisto}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.base1}
              />
            </View>
            <Spacer position="top" size="xxlarge">
              <Text
                style={{ textAlign: "center" }}
                variant="custom"
                colorType="base1"
                fontType="arimaMadurai"
                fontSize="h3">
                Help Center
              </Text>
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <Button
                backgroundColor={theme.colors.brand.base8}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("general question")}
                text="General Question"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.base1}
                width="100%"
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={theme.colors.brand.base8}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("report illegal content")}
                text="Report Illegal Content"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.base1}
                width="100%"
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={theme.colors.brand.base8}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("technical issue")}
                text="Technical Issue"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.base1}
                width="100%"
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={theme.colors.brand.base8}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("safety issue")}
                text="Safety Issue"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.base1}
                width="100%"
              />
            </Spacer>
          </View>
        </HorizontalPaddingSpace>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <HorizontalPaddingSpace
              style={{ width: width, marginBottom: theme.spaceNumberBy50[0] }}
              space={theme.space[7]}>
              <View
                style={{
                  position: "absolute",
                  right: theme.spaceNumberBy10[3],
                }}>
                <IconComponent
                  iconFunction={onCloseContactModal}
                  iconName="close-a"
                  IconComponent={Fontisto}
                  size={theme.spaceNumberBy10[1]}
                  color={theme.colors.brand.base1}
                />
              </View>
              <Spacer position="top" size="xxlarge">
                <Text
                  style={{ textAlign: "center" }}
                  variant="custom"
                  colorType="base1"
                  fontType="arimaMadurai"
                  fontSize="h3">
                  We are here to help.
                </Text>
              </Spacer>
              <Spacer position="top" size="xxxlarge">
                <TextAreaComponent
                  text={selectedHelp}
                  theme={theme}
                  selectedHelpValue={selectedHelpValue}
                  setValue={setSelectedHelpValue}
                />
                <Spacer position="top" size="xxxlarge">
                  {isSendingMessage ? (
                    <View
                      style={{
                        backgroundColor: theme.colors.brand.base8,
                        width: "100%",
                        borderRadius: theme.spaceNumber[8],
                        paddingTop: theme.spaceNumber[7],
                        paddingBottom: theme.spaceNumber[7],
                      }}>
                      <Spinner size="small" color={theme.colors.brand.base1} />
                    </View>
                  ) : (
                    <Button
                      backgroundColor={theme.colors.brand.base8}
                      borderRadius={`${theme.spaceNumber[8]}px`}
                      isBorder={false}
                      isNotBold={false}
                      buttonFunction={() =>
                        handleSendMessage(selectedHelp, selectedHelpValue)
                      }
                      text="Send"
                      fontType={theme.fonts.montserratLight}
                      textColor={theme.colors.brand.base1}
                      width="100%"
                    />
                  )}
                </Spacer>
                {messageSentNote && (
                  <Spacer position="top" size="large">
                    <Text
                      style={{ textAlign: "center" }}
                      variant="custom"
                      colorType="base6"
                      fontType="montserratRegular"
                      fontSize="caption">
                      Message Sent Successfully!
                    </Text>
                  </Spacer>
                )}
              </Spacer>
            </HorizontalPaddingSpace>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </AnimatedModal>
  );
}

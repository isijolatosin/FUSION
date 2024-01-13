import React from "react";
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
  return (
    <AnimatedModal
      isVisible={openContactModal}
      onClose={onCloseContactModal}
      theme={theme}>
      {!selectedHelp ? (
        <HorizontalPaddingSpace style={{ width: width }} space={theme.space[7]}>
          <View>
            <View style={{ position: "absolute", right: 0 }}>
              <IconComponent
                iconFunction={onCloseContactModal}
                iconName="close-a"
                IconComponent={Fontisto}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.black}
              />
            </View>
            <Spacer position="top" size="xxlarge">
              <Text
                style={{ textAlign: "center" }}
                variant="subHeading"
                colorType="black"
                fontType="playfairbold"
                fontSize="h3">
                Hi, Ask away.
              </Text>
              <Text
                style={{ textAlign: "center" }}
                variant="subHeading"
                colorType="black"
                fontType="playfairbold"
                fontSize="h3">
                We are here to help.
              </Text>
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <Button
                backgroundColor={theme.colors.brand.highlight}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("general question")}
                text="General Question"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.black}
                width="100%"
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={theme.colors.brand.highlight}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("technical issue")}
                text="Technical Issue"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.black}
                width="100%"
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={theme.colors.brand.highlight}
                borderRadius={`${theme.spaceNumber[8]}px`}
                isBorder={false}
                isNotBold={false}
                buttonFunction={() => setSelectedHelp("safety issue")}
                text="Safety Issue"
                fontType={theme.fonts.montserratSemibold}
                textColor={theme.colors.brand.black}
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
                  color={theme.colors.brand.black}
                />
              </View>
              <Spacer position="top" size="xxlarge">
                <Text
                  style={{ textAlign: "center" }}
                  variant="subHeading"
                  colorType="black"
                  fontType="playfairbold"
                  fontSize="h3">
                  Hi, Ask away.
                </Text>
                <Text
                  style={{ textAlign: "center" }}
                  variant="subHeading"
                  colorType="black"
                  fontType="playfairbold"
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
                  <Button
                    backgroundColor={theme.colors.brand.highlight}
                    borderRadius={`${theme.spaceNumber[8]}px`}
                    isBorder={false}
                    isNotBold={false}
                    buttonFunction={() => {
                      setMessageSentNote(true);
                      const subject = `${selectedHelp} from ${currentUser?.firstname} - Phone-No: ${currentUser?.phonenumber}`;
                      const message = `${selectedHelpValue} - ${currentUser?.email} `;
                      // To decide how to send email
                    }}
                    text="Send"
                    fontType={theme.fonts.montserratBold}
                    textColor={theme.colors.brand.black}
                    width="100%"
                  />
                </Spacer>
                {messageSentNote && (
                  <Spacer position="top" size="large">
                    <Text
                      style={{ textAlign: "center" }}
                      variant="subHeading"
                      colorType="base"
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

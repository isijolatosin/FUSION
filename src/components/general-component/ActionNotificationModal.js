import React from "react";
import { View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

import { PopupModal } from "../../features/Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import Button from "../utility/button.component";
import IconComponent from "../icon-components/IconComponent";

const ActionNotificationModal = ({
  title,
  buttonText,
  message,
  confirmation,
  confirmationText,
  theme,
  functionCall,
  onClose,
  horizontalSpace,
}) => {
  return (
    <HorizontalPaddingSpace
      style={{ width: "100%", backgroundColor: theme.colors.brand.base }}
      space={horizontalSpace ?? theme.space[0]}>
      <Spacer position="bottom" size="medium">
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="base1"
          fontType="arimaMadurai"
          fontSize="h4">
          {title}
        </Text>
      </Spacer>
      <View
        style={{
          width: "100%",
          paddingTop: theme.spaceNumberBy10[6],
          paddingHorizontal: theme.spaceNumber[5],
          paddingVertical: theme.spaceNumberBy10[2],
          backgroundColor: theme.colors.brand.base8,
          borderRadius: theme.spaceNumber[2],
          alignItems: "center",
          position: "relative",
        }}>
        <Text
          style={{
            marginBottom: theme.spaceNumberBy10[3],
            textAlign: "center",
          }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="caption">
          {message}
          {confirmation && (
            <>
              {"\n"}
              {"\n"}
              {"\n"}
              <Text
                style={{ textAlign: "center" }}
                variant="custom"
                colorType="base1"
                fontType="montserratRegular"
                fontSize="caption">
                {confirmationText}
              </Text>
            </>
          )}
        </Text>
        {!confirmation && (
          <Button
            buttonFunction={() => {
              functionCall();
            }}
            backgroundColor={theme.colors.brand.base}
            borderRadius={theme.space[5]}
            text={buttonText}
            textColor={theme.colors.brand.highlight}
            fontType={theme.fonts.montserratRegular}
            width="60%"
          />
        )}
        <View
          style={{
            position: "abslute",
            right: theme.spaceNumberBy10[0],
            top: theme.spaceNumberBy10[0],
            backgroundColor: theme.colors.brand.base,
            position: "absolute",
            marginLeft: theme.spaceNumberBy10[1],
            padding: theme.spaceNumber[2],
            borderRadius: theme.spaceNumberBy10[2],
          }}>
          <IconComponent
            iconFunction={onClose}
            iconName="close-a"
            IconComponent={Fontisto}
            size={theme.spaceNumber[4]}
            color={theme.colors.brand.basewhite}
          />
        </View>
      </View>
    </HorizontalPaddingSpace>
  );
};

export default ActionNotificationModal;

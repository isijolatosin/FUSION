import React from "react";
import { View } from "react-native";
import { SafeArea } from "../utility/safe-area.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { Spacer } from "../spacer/spacer.component";
import BrandAvatarO from "./BrandAvatarO";
import { Text } from "../typography/text.component";
import Button from "../utility/button.component";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";

const ProfileDeactivateCardComponent = ({
  currentUser,
  message,
  setIsRetrigger,
  theme,
}) => {
  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.highlight }}>
      <HorizontalPaddingSpace space={theme.space[4]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="xlarge">
            <BrandAvatarO currentUser={currentUser} />
          </Spacer>
        </Spacer>
        <Spacer style={{ alignItems: "center" }} position="top" size="">
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="linesLight"
            fontType="arimaMadurai"
            fontSize="h4">
            Profile Deactivated
          </Text>
        </Spacer>
        <Spacer style={{ alignItems: "center" }} position="top" size="large">
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="caption">
            {message}
          </Text>
        </Spacer>
        <Spacer
          style={{ alignItems: "center" }}
          position="top"
          size="xxxxlarge">
          <Button
            backgroundColor="transparent"
            borderRadius={theme.space[3]}
            isBorder={true}
            borderColor={theme.colors.brand.base}
            buttonFunction={async () => {
              await updateUserValueField(
                "all-users",
                currentUser?.id,
                "deactivate",
                false,
                setIsRetrigger
              );
            }}
            text="Activate profile"
            textColor={theme.colors.brand.base}
            width="80%"
          />
        </Spacer>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default ProfileDeactivateCardComponent;

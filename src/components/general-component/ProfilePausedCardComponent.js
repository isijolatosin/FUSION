import React from "react";
import {} from "react-native";
import { SafeArea } from "../utility/safe-area.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import BrandAvatarO from "./BrandAvatarO";
import { Spacer } from "../spacer/spacer.component";
import CustomUseCardWithCTA from "./CustomUseCardWithCTA";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";
import { Text } from "../typography/text.component";

const ProfilePausedCardComponent = ({
  currentUser,
  message,
  setIsRetrigger,
  theme,
}) => {
  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace space={theme.space[4]}>
        <Spacer position="top" size="large">
          <BrandAvatarO currentUser={currentUser} />
        </Spacer>
      </HorizontalPaddingSpace>
      <Spacer style={{ alignItems: "center" }} position="top" size="">
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType="arimaMadurai"
          fontSize="h4">
          Profile Paused
        </Text>
      </Spacer>
      <Spacer position="top" size="xxsmall" style={{ flex: 0.5 }}>
        {currentUser?.pause && (
          <CustomUseCardWithCTA
            text={message}
            buttonText="Unpause profile"
            cardFunction={async () => {
              await updateUserValueField(
                "all-users",
                currentUser?.id,
                "pause",
                false,
                setIsRetrigger
              );
            }}
            gapSize="xxsmall"
          />
        )}
      </Spacer>
    </SafeArea>
  );
};

export default ProfilePausedCardComponent;

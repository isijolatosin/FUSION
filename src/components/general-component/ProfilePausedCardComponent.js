import React from "react";
import {} from "react-native";
import { SafeArea } from "../utility/safe-area.component";
import { Spacer } from "../spacer/spacer.component";
import CustomUseCardWithCTA from "./CustomUseCardWithCTA";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";

const ProfilePausedCardComponent = ({
  currentUser,
  message,
  setIsRetrigger,
  theme,
}) => {
  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
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
            headingTitle=" Profile Paused"
          />
        )}
      </Spacer>
    </SafeArea>
  );
};

export default ProfilePausedCardComponent;

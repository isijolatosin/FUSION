import React from "react";
import { SafeArea } from "../utility/safe-area.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import Button from "../utility/button.component";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";
import HeaderComponent from "./HeaderComponent";

const ProfileDeactivateCardComponent = ({
  currentUser,
  message,
  setIsRetrigger,
  theme,
}) => {
  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.highlight }}>
      <Spacer position="top" size="large">
        <HorizontalPaddingSpace space={theme.space[4]}>
          <HeaderComponent
            title="Profile Deactivated"
            theme={theme}
            LeftComp={() => <></>}
            RightComp={() => <></>}
          />
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
      </Spacer>
    </SafeArea>
  );
};

export default ProfileDeactivateCardComponent;

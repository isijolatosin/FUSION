import React from "react";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { useAppContext } from "../../../context/ThemeContext";

const ProfileScreen = () => {
  const {
    state: { theme },
  } = useAppContext();
  return (
    <SafeArea>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[5]}>
        <Spacer position="top" size="xxxlarge">
          <Text variant="headingSlim" width="50%">
            What's your number?
          </Text>
        </Spacer>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default ProfileScreen;

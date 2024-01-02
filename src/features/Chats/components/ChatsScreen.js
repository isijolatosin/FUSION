import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";

const ChatsScreen = () => {
  const {
    state: { theme },
  } = useAppContext();
  return (
    <SafeArea>
      <Spacer position="top" size="xxxlarge">
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer position="bottom" size="large">
            <Text
              variant="subHeading"
              colorType="black"
              fontType="montserratBold">
              New Matches
            </Text>
          </Spacer>
          <Spacer position="bottom" size="large">
            <Text
              variant="subHeading"
              colorType="black"
              fontType="montserratBold">
              Messages
            </Text>
          </Spacer>
        </HorizontalPaddingSpace>
      </Spacer>
    </SafeArea>
  );
};

export default ChatsScreen;

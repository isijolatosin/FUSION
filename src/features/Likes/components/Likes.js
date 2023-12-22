import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";

const LikesScreen = () => {
  return (
    <SafeArea>
      <HorizontalPaddingSpace>
        <Spacer position="bottom" size="large">
          <Text variant="heading">Likes Screen!</Text>
        </Spacer>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default LikesScreen;

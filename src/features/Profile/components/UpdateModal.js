import React from "react";

import { PopupModal } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export default function UpdateModal({ height, theme, children }) {
  return (
    <PopupModal height={height}>
      <HorizontalPaddingSpace
        style={{
          width: "100%",
          position: "relative",
          height: height,
        }}
        space={theme.space[5]}>
        <Spacer position="top" size="xxxxlarge">
          <Spacer position="top" size="xxlarge">
            {children}
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
    </PopupModal>
  );
}

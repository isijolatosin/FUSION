import React, { Fragment } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export default function OnboardingErrorComponent({
  pageError,
  text,
  bottomSpace,
}) {
  return (
    <Fragment>
      {pageError && (
        <Spacer
          style={{ marginBottom: bottomSpace ? 30 : 0 }}
          position="top"
          size="large">
          <Text variant="custom" colorType="error" fontType="montserratRegular">
            Error: {text}
          </Text>
        </Spacer>
      )}
    </Fragment>
  );
}

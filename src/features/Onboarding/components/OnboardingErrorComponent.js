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
          style={{ marginBottom: bottomSpace ? 60 : 0 }}
          position="top"
          size="large">
          <Text variant="error" width="100%">
            Error: {text}
          </Text>
        </Spacer>
      )}
    </Fragment>
  );
}

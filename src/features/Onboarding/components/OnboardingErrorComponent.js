import React, { Fragment } from "react";
import { Platform, Text as RNText } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export default function OnboardingErrorComponent({
  pageError,
  text,
  bottomSpace,
  size,
  theme,
  classes,
}) {
  return (
    <Fragment>
      {pageError && (
        <Spacer
          style={{ marginBottom: bottomSpace ? theme.spaceNumber[2] : 0 }}
          position="top"
          size="large">
          {Platform.OS === "ios" ? (
            <Text
              variant="custom"
              colorType="error"
              fontType="montserratSemibold"
              lineHeight={theme?.lineHeights[0]}
              fontSize={size}>
              {text}
            </Text>
          ) : (
            <RNText style={classes}>{text}</RNText>
          )}
        </Spacer>
      )}
    </Fragment>
  );
}

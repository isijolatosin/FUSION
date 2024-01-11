import React, { Fragment } from "react";
import { Avatar as ReactNativeAvatar } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";

export default function AvatarVerticalList({ theme }) {
  return (
    <Fragment>
      <Spacer
        position="bottom"
        size="small"
        style={{
          opacity: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          paddingBottom: theme.spaceNumber[5],
          marginBottom: theme.spaceNumber[7],
        }}>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ marginTop: -10 }}>
          <ReactNativeAvatar.Image
            size={theme.spaceNumberBy10[5]}
            source={require("../../../../assets/avatar_female.png")}
          />
        </HorizontalPaddingSpace>
      </Spacer>
      <Spacer
        position="bottom"
        size="small"
        style={{
          opacity: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          paddingBottom: theme.spaceNumber[5],
          marginBottom: theme.spaceNumber[7],
        }}>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ marginTop: -10 }}>
          <ReactNativeAvatar.Image
            size={theme.spaceNumberBy10[5]}
            source={require("../../../../assets/avatar.jpeg")}
          />
        </HorizontalPaddingSpace>
      </Spacer>
      <Spacer
        position="bottom"
        size="small"
        style={{
          opacity: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          paddingBottom: theme.spaceNumber[5],
          marginBottom: theme.spaceNumber[7],
        }}>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ marginTop: -10 }}>
          <ReactNativeAvatar.Image
            size={theme.spaceNumberBy10[5]}
            source={require("../../../../assets/avatar_female.png")}
          />
        </HorizontalPaddingSpace>
      </Spacer>
      <Spacer
        position="bottom"
        size="small"
        style={{
          opacity: 0.4,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.brand.linesLight,
          paddingBottom: theme.spaceNumber[5],
          marginBottom: theme.spaceNumber[7],
        }}>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ marginTop: -10 }}>
          <ReactNativeAvatar.Image
            size={theme.spaceNumberBy10[5]}
            source={require("../../../../assets/avatar.jpeg")}
          />
        </HorizontalPaddingSpace>
      </Spacer>
    </Fragment>
  );
}

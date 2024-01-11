import React, { Fragment } from "react";
import { Avatar as ReactNativeAvatar } from "react-native-paper";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";

export default function AvatarList({ theme }) {
  return (
    <Fragment>
      <HorizontalPaddingSpace
        space={theme.space[0]}
        style={{
          marginTop: theme.spaceNumber[5],
          marginRight: theme.spaceNumber[5],
        }}>
        <ReactNativeAvatar.Image
          size={theme.spaceNumberBy10[5]}
          source={require("../../../../assets/avatar_female.png")}
        />
      </HorizontalPaddingSpace>
      <HorizontalPaddingSpace
        space={theme.space[0]}
        style={{
          marginTop: theme.spaceNumber[5],
          marginRight: theme.spaceNumber[5],
        }}>
        <ReactNativeAvatar.Image
          size={theme.spaceNumberBy10[5]}
          source={require("../../../../assets/avatar.jpeg")}
        />
      </HorizontalPaddingSpace>
      <HorizontalPaddingSpace
        space={theme.space[0]}
        style={{
          marginTop: theme.spaceNumber[5],
          marginRight: theme.spaceNumber[5],
        }}>
        <ReactNativeAvatar.Image
          size={theme.spaceNumberBy10[5]}
          source={require("../../../../assets/avatar_female.png")}
        />
      </HorizontalPaddingSpace>
      <HorizontalPaddingSpace
        space={theme.space[0]}
        style={{
          marginTop: theme.spaceNumber[5],
          marginRight: theme.spaceNumber[5],
        }}>
        <ReactNativeAvatar.Image
          size={theme.spaceNumberBy10[5]}
          source={require("../../../../assets/avatar.jpeg")}
        />
      </HorizontalPaddingSpace>
    </Fragment>
  );
}

import React from "react";
import { Image, View } from "react-native";
import { Spacer } from "../spacer/spacer.component";

const IllustrationContainer = ({ ImageComponent, spaceSize, theme }) => {
  return (
    <Spacer position="bottom" size={spaceSize}>
      <View
        style={{
          width: theme.spaceNumberBy50[2] + theme.spaceNumberBy10[4],
          height: theme.spaceNumberBy50[2] + theme.spaceNumberBy10[1],
          alignSelf: "center",
        }}>
        <ImageComponent />
      </View>
    </Spacer>
  );
};

export default IllustrationContainer;

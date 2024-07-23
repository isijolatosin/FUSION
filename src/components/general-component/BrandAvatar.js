import { View } from "react-native";
import React from "react";
import { Text } from "../typography/text.component";
import { useAppContext } from "../../context/ThemeContext";
import ImageViewer from "./ImageViewer";

export default function BrandAvatar({ noFlex, width, isLike }) {
  const {
    state: { theme },
  } = useAppContext();
  return (
    <View style={noFlex ? {} : { flex: 1 }}>
      <View style={{ width: width, position: "relative" }}>
        <ImageViewer
          url={require("../../../assets/wiingr.png")}
          style={{
            width: "100%",
            height: theme.spaceNumberBy10[7],
            resizeMode: "contain",
          }}
          isLocalUrl={true}
        />
        <View
          style={{
            position: "absolute",
            left: noFlex ? "100%" : isLike ? "60%" : "74%",
            top: noFlex ? -theme.spaceNumber[0] : theme.spaceNumber[4],
            borderWidth: 1,
            borderRadius: theme.spaceNumberBy50[1],
            borderColor: noFlex
              ? theme.colors.brand.black
              : theme.colors.brand.linesLight,
            width: noFlex ? theme.spaceNumber[5] : theme.spaceNumber[5],
            height: noFlex ? theme.spaceNumber[5] : theme.spaceNumber[5],
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType={noFlex ? "black" : "lines"}
            fontType="montserratRegular"
            fontSize="xcaption">
            R
          </Text>
        </View>
      </View>
    </View>
  );
}

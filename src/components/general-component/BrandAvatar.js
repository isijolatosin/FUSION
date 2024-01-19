import { Image, View } from "react-native";
import React from "react";
import { Text } from "../typography/text.component";
import { useAppContext } from "../../context/ThemeContext";

export default function BrandAvatar({ noFlex, width }) {
  const {
    state: { theme },
  } = useAppContext();
  return (
    <View style={noFlex ? {} : { flex: 1 }}>
      <View style={{ width: width, position: "relative" }}>
        <Image
          source={require("../../../assets/fusion_logo.png")}
          style={{ width: "100%", resizeMode: "contain" }}
        />
        <View
          style={{
            position: "absolute",
            left: noFlex ? "100%" : "70.5%",
            top: noFlex ? -theme.spaceNumber[0] : -theme.spaceNumberBy10[0],
            borderWidth: 1,
            borderRadius: theme.spaceNumberBy50[1],
            borderColor: noFlex
              ? theme.colors.brand.black
              : theme.colors.brand.linesLight,
            width: noFlex ? theme.spaceNumber[5] : theme.spaceNumber[6],
            height: noFlex ? theme.spaceNumber[5] : theme.spaceNumber[6],
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

import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { HorizontalPaddingSpace } from "../utility/space-area.component";

const Placeholder = ({ isSliblingComp, theme, width, height }) => {
  return (
    <HorizontalPaddingSpace
      space={theme.space[2]}
      style={{
        position: "absolute",
        backgroundColor: theme.colors.brand.base,
        top: 0,
        bottom: 0,
        width: isSliblingComp ? width - 20 : width,
        height: height,
      }}>
      {isSliblingComp ? (
        <></>
      ) : (
        <View
          style={{
            height: "4%",
            marginTop: theme.spaceNumberBy10[5],
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View
            style={{
              height: "100%",
              width: theme.spaceNumberBy10[3],
              backgroundColor: theme.colors.brand.linesFaint,
              borderRadius: theme.spaceNumber[3],
            }}
          />
          <View
            style={{
              height: "100%",
              width: theme.spaceNumberBy50[4],
              backgroundColor: theme.colors.brand.linesFaint,
              borderRadius: theme.spaceNumber[9],
            }}
          />
          <View
            style={{
              height: "100%",
              width: theme.spaceNumberBy10[3],
              backgroundColor: theme.colors.brand.linesFaint,
              borderRadius: theme.spaceNumber[3],
            }}
          />
        </View>
      )}
      <View
        style={{
          height: "57%",
          backgroundColor: theme.colors.brand.linesFaint,
          borderRadius: theme.spaceNumberBy10[3],
          marginTop: theme.spaceNumberBy10[0],
        }}>
        <View
          style={{
            width: "60%",
            height: "100%",
            opacity: 0.1,
            alignSelf: "center",
          }}>
          <LottieView
            source={require("../../../assets/animations/gym-trans.json")}
            autoPlay
            loop
            style={{ color: theme.colors.brand.linesFaint }}
          />
        </View>
      </View>
      <View
        style={{
          height: "3%",
          width: "50%",
          backgroundColor: theme.colors.brand.linesFaint,
          borderRadius: theme.spaceNumberBy10[3],
          marginTop: theme.spaceNumber[2],
          marginLeft: theme.spaceNumberBy10[0],
        }}
      />
      <View
        style={{
          height: "3%",
          width: "70%",
          backgroundColor: theme.colors.brand.linesFaint,
          borderRadius: theme.spaceNumberBy10[3],
          marginTop: theme.spaceNumber[2],
          marginLeft: theme.spaceNumberBy10[0],
        }}
      />
      <View
        style={{
          height: "3%",
          width: "90%",
          backgroundColor: theme.colors.brand.linesFaint,
          borderRadius: theme.spaceNumberBy10[3],
          marginTop: theme.spaceNumber[2],
          marginLeft: theme.spaceNumberBy10[0],
        }}
      />
      <View
        style={{
          height: theme.spaceNumberBy10[3],
          marginTop: theme.spaceNumber[2],
          flexDirection: "row",
          alignItems: "center",
          marginLeft: theme.spaceNumberBy10[0],
        }}>
        <View
          style={{
            width: theme.spaceNumberBy10[3],
            height: "100%",
            backgroundColor: theme.colors.brand.linesFaint,
            borderRadius: theme.spaceNumberBy10[4],
            marginRight: theme.spaceNumberBy10[0],
          }}
        />
        <View
          style={{
            width: theme.spaceNumberBy10[3],
            height: "100%",
            backgroundColor: theme.colors.brand.linesFaint,
            borderRadius: theme.spaceNumberBy10[4],
          }}
        />
      </View>
    </HorizontalPaddingSpace>
  );
};

export default Placeholder;

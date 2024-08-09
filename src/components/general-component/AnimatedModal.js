import React from "react";
import { Platform } from "react-native";
import Modal from "react-native-modal";

export default function AnimatedModal({
  animationin,
  animationout,
  children,
  isAlignItems,
  paddingBottom,
  backgroundColor,
  isPaddingTop,
  isVisible,
  onClose,
  theme,
  width,
  backdropOpacity,
  isJustifyContent,
  animationInTiming,
  animationOutTiming,
}) {
  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={animationInTiming ? animationInTiming : 300}
      animationOutTiming={animationOutTiming ? animationOutTiming : 300}
      animationIn={animationin ? animationin : "slideInRight"}
      animationOut={animationout ? animationout : "slideOutRight"}
      onBackdropPress={onClose}
      backdropColor={
        backgroundColor ? backgroundColor : theme.colors.brand.base
      }
      backdropOpacity={backdropOpacity ? backdropOpacity : 1}
      style={{
        margin: 0,
        paddingTop: isPaddingTop ? (Platform.OS === "ios" ? 150 : 100) : 0,
        position: "relative",
        alignItems: isAlignItems ? "flex-end" : "",
        paddingBottom: paddingBottom ? paddingBottom : 0,
        width: width,
        justifyContent: isJustifyContent ? isJustifyContent : "",
      }}>
      {children}
    </Modal>
  );
}
